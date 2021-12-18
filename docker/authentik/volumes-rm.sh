docker volume ls | grep authentik | awk '{print $2}' | xargs docker volume rm

