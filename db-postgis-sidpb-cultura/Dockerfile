FROM postgis/postgis:15-3.4-alpine

FROM postgis/postgis:15-3.4-alpine

COPY sql/00-init-bancos.sh /docker-entrypoint-initdb.d/00-init-bancos.sh

RUN sed -i 's/\r$//' /docker-entrypoint-initdb.d/00-init-bancos.sh \
    && chmod +x /docker-entrypoint-initdb.d/00-init-bancos.sh