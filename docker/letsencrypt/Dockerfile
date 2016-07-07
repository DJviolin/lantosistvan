# Lanti/LetsEncrypt
#
# VERSION               1.0.0

FROM lantosistvan_base:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="Let's Encrypt" Vendor="Istvan Lantos" Version="1.0"

# Let's Encrypt
# https://github.com/nginxinc/docker-nginx/blob/master/mainline/alpine/Dockerfile
# https://github.com/bringnow/docker-nginx-letsencrypt
#
# https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04
# http://letsencrypt.readthedocs.io/en/latest/using.html#command-line-options
# http://letsencrypt.readthedocs.io/en/latest/using.html#webroot
# http://letsencrypt.readthedocs.io/en/latest/using.html#nginx
RUN curl -fSL "https://github.com/certbot/certbot/archive/master.tar.gz" -o "letsencrypt.tar.gz" \
    && mkdir -p /opt/letsencrypt /var/www/html/.well-known \
    && tar -xf "letsencrypt.tar.gz" -C /opt/letsencrypt --strip-components=1 \
    && rm "letsencrypt.tar.gz"*
#RUN ./certbot-auto certonly --noninteractive \
#    --authenticator webroot --webroot-path=/var/www/html \
#    --domain dev.cinematicheart.com \
#    --email kerozin.joe@gmail.com \
#    --agree-tos

#OpenSSL
#RUN openssl req \
#    -x509 -nodes -sha256 -days 365 \
#    -subj '/C=HU/ST=Pest/L=Budapest/CN=dev.cinematicheart.com' \
#    -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt \
#    && openssl dhparam -out /etc/nginx/ssl/dhparam.pem 4096

WORKDIR /opt/letsencrypt

CMD ["tail", "-f", "/dev/null"]
