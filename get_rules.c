#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>
#include <cjson/cJSON.h>

typedef struct {
    char source_ip[16];
    char dest_ip[16];
    char action[8];
    char url[256];
    int port;
} Rule;

struct MemoryStruct {
    char *memory;
    size_t size;
};

static size_t WriteMemoryCallback(void *contents, size_t size, size_t nmemb, void *userp) {
    size_t realsize = size * nmemb;
    struct MemoryStruct *mem = (struct MemoryStruct *)userp;

    char *ptr = realloc(mem->memory, mem->size + realsize + 1);
    if(ptr == NULL) return 0;

    mem->memory = ptr;
    memcpy(&(mem->memory[mem->size]), contents, realsize);
    mem->size += realsize;
    mem->memory[mem->size] = 0;
    return realsize;
}

void print_ip_rules(cJSON *array, const char *label) {
    if(!cJSON_IsArray(array)) return;

    int count = cJSON_GetArraySize(array);
    for(int i=0; i<count; i++) {
        cJSON *item = cJSON_GetArrayItem(array, i);
        cJSON *source_ip = cJSON_GetObjectItem(item, "source_ip");
        cJSON *dest_ip = cJSON_GetObjectItem(item, "dest_ip");
        cJSON *action = cJSON_GetObjectItem(item, "action");
        if(!source_ip || !dest_ip || !action) continue;

        printf("%s Rule %d: %s -> %s | %s\n", label, i+1,
               source_ip->valuestring,
               dest_ip->valuestring,
               action->valuestring);
    }
}

void print_url_rules(cJSON *array, const char *label) {
    if(!cJSON_IsArray(array)) return;

    int count = cJSON_GetArraySize(array);
    for(int i=0; i<count; i++) {
        cJSON *item = cJSON_GetArrayItem(array, i);
        cJSON *url = cJSON_GetObjectItem(item, "url");
        cJSON *action = cJSON_GetObjectItem(item, "action");
        if(!url || !action) continue;

        printf("%s Rule %d: %s | %s\n", label, i+1,
               url->valuestring,
               action->valuestring);
    }
}

void print_port_rules(cJSON *array, const char *label) {
    if(!cJSON_IsArray(array)) return;

    int count = cJSON_GetArraySize(array);
    for(int i=0; i<count; i++) {
        cJSON *item = cJSON_GetArrayItem(array, i);
        cJSON *port = cJSON_GetObjectItem(item, "port");
        cJSON *action = cJSON_GetObjectItem(item, "action");
        if(!port || !action) continue;

        printf("%s Rule %d: %d | %s\n", label, i+1,
               port->valueint,
               action->valuestring);
    }
}

int main(int argc, char *argv[]) {
    const char *type = "ips"; // ברירת מחדל
    if(argc > 1) type = argv[1];

    CURL *curl;
    CURLcode res;
    struct MemoryStruct chunk;
    chunk.memory = malloc(1);
    chunk.size = 0;

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if(!curl) {
        fprintf(stderr, "curl init failed\n");
        return 1;
    }

    char url[512];
    snprintf(url, sizeof(url), "http://localhost:5000/api/firewall/rules?type=%s", type);
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void *)&chunk);

    res = curl_easy_perform(curl);
    if(res != CURLE_OK) {
        fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        free(chunk.memory);
        curl_easy_cleanup(curl);
        return 1;
    }

    printf("Received JSON:\n%s\n", chunk.memory);

    cJSON *root = cJSON_Parse(chunk.memory);
    if(!root) {
        fprintf(stderr, "Failed to parse JSON\n");
        free(chunk.memory);
        curl_easy_cleanup(curl);
        return 1;
    }

    cJSON *response = cJSON_GetObjectItem(root, "response");
    if(!response || !cJSON_IsObject(response)) {
        fprintf(stderr, "JSON does not contain 'response'\n");
        cJSON_Delete(root);
        free(chunk.memory);
        curl_easy_cleanup(curl);
        return 1;
    }

    if(strcmp(type, "ips") == 0) {
        cJSON *ips = cJSON_GetObjectItem(response, "ips");
        if(!ips || !cJSON_IsObject(ips)) {
            fprintf(stderr, "JSON does not contain 'ips'\n");
        } else {
            print_ip_rules(cJSON_GetObjectItem(ips, "blacklist"), "Blacklist");
            print_ip_rules(cJSON_GetObjectItem(ips, "whitelist"), "Whitelist");
        }
    } else if(strcmp(type, "urls") == 0) {
        cJSON *urls = cJSON_GetObjectItem(response, "urls");
        if(!urls || !cJSON_IsObject(urls)) {
            fprintf(stderr, "JSON does not contain 'urls'\n");
        } else {
            print_url_rules(cJSON_GetObjectItem(urls, "blacklist"), "Blacklist");
            print_url_rules(cJSON_GetObjectItem(urls, "whitelist"), "Whitelist");
        }
    } else if(strcmp(type, "ports") == 0) {
        cJSON *ports = cJSON_GetObjectItem(response, "ports");
        if(!ports || !cJSON_IsObject(ports)) {
            fprintf(stderr, "JSON does not contain 'ports'\n");
        } else {
            print_port_rules(cJSON_GetObjectItem(ports, "blacklist"), "Blacklist");
            print_port_rules(cJSON_GetObjectItem(ports, "whitelist"), "Whitelist");
        }
    } else {
        fprintf(stderr, "Unknown type: %s\n", type);
    }

    cJSON_Delete(root);
    free(chunk.memory);
    curl_easy_cleanup(curl);
    curl_global_cleanup();

    return 0;
}
