# Lanti/Nginx
#
# VERSION               1.0.0

FROM lantosistvan_base:latest
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL Description="Nginx built from source" Vendor="Istvan Lantos" Version="1.0"

ENV NGINX_VERSION nginx-1.11.1.tar.gz
ENV GPG_KEYS B0F4253373F8F6F510D42178520A9993A1C052F8
ENV OPENSSL_VERSION openssl-1.0.2h.tar.gz

RUN echo "\
# http://apt.llvm.org/\n\
deb http://apt.llvm.org/jessie/ llvm-toolchain-jessie main\n\
deb-src http://apt.llvm.org/jessie/ llvm-toolchain-jessie main\n\
# 3.7\n\
deb http://apt.llvm.org/jessie/ llvm-toolchain-jessie-3.7 main\n\
deb-src http://apt.llvm.org/jessie/ llvm-toolchain-jessie-3.7 main\n\
# 3.8\n\
deb http://apt.llvm.org/jessie/ llvm-toolchain-jessie-3.8 main\n\
deb-src http://apt.llvm.org/jessie/ llvm-toolchain-jessie-3.8 main" > /etc/apt/sources.list.d/clang.list \
&& curl "http://apt.llvm.org/llvm-snapshot.gpg.key" -o "llvm-snapshot.gpg.key" | apt-key add -

RUN apt-get -y update && apt-get -y dist-upgrade \
    && apt-get -y install \
        make \
        gcc \
        # Nginx packages
        openssl \
        libc6-dev \
        libexpat1-dev \
        libgd-dev \
        libgeoip-dev \
        libpam0g-dev \
        libpcre3-dev \
        libssl-dev \
        libxml2-dev \
        libxslt1-dev \
        zlib1g-dev \
        libperl-dev \
        # Clang development branch
        clang-3.9 \
        lldb-3.9 \
    # Nginx
    && curl -fSL "http://nginx.org/download/$NGINX_VERSION" -o "$NGINX_VERSION" \
    && curl -fSL "http://nginx.org/download/$NGINX_VERSION.asc" -o "$NGINX_VERSION.asc" \
    && gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$GPG_KEYS" \
    && gpg --batch --verify "$NGINX_VERSION.asc" "$NGINX_VERSION" \
    && mkdir -p /usr/src/nginx \
    && tar -xf "$NGINX_VERSION" -C /usr/src/nginx --strip-components=1 \
    && rm "$NGINX_VERSION"* \
    # ngx_cache_purge
    && curl -fSL "https://github.com/FRiCKLE/ngx_cache_purge/archive/master.tar.gz" -o "ngx_cache_purge.tar.gz" \
    && mkdir -p /usr/src/nginx-modules/ngx_cache_purge \
    && tar -xf "ngx_cache_purge.tar.gz" -C /usr/src/nginx-modules/ngx_cache_purge --strip-components=1 \
    && rm "ngx_cache_purge.tar.gz"* \
    # ngx_srcache
    && curl -fSL "https://github.com/openresty/srcache-nginx-module/archive/master.tar.gz" -o "ngx_srcache.tar.gz" \
    && mkdir -p /usr/src/nginx-modules/ngx_srcache \
    && tar -xf "ngx_srcache.tar.gz" -C /usr/src/nginx-modules/ngx_srcache --strip-components=1 \
    && rm "ngx_srcache.tar.gz"* \
    # OpenSSL library sources
    && curl -fSL "https://www.openssl.org/source/$OPENSSL_VERSION" -o "$OPENSSL_VERSION" \
    && curl -fSL "https://www.openssl.org/source/$OPENSSL_VERSION.asc" -o "$OPENSSL_VERSION.asc" \
    && gpg --keyserver pgpkeys.mit.edu --recv-key 0E604491 \
    && gpg --verify "$OPENSSL_VERSION.asc" \
    && mkdir -p /usr/src/openssl \
    && tar -xf "$OPENSSL_VERSION" -C /usr/src/openssl --strip-components=1 \
    && rm "$OPENSSL_VERSION"* \
    # nginScript
    && curl -fSL "http://hg.nginx.org/njs/archive/tip.tar.gz" -o "njs.tar.gz" \
    && mkdir -p /usr/src/nginx-modules/njs \
    && tar -xf "njs.tar.gz" -C /usr/src/nginx-modules/njs --strip-components=1 \
    && rm "njs.tar.gz"*

WORKDIR /usr/src/nginx

# Configuring the build
RUN ./configure \
        --prefix=/etc/nginx \
        --sbin-path=/usr/sbin/nginx \
        --modules-path=/usr/lib/nginx/modules \
        --conf-path=/etc/nginx/nginx.conf \
        --error-log-path=/var/log/nginx/error.log \
        --http-log-path=/var/log/nginx/access.log \
        --pid-path=/var/run/nginx.pid \
        --lock-path=/var/run/nginx.lock \
        #--http-client-body-temp-path=/var/cache/nginx/client_temp \
        #--http-proxy-temp-path=/var/cache/nginx/proxy_temp \
        #--http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
        #--http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
        #--http-scgi-temp-path=/var/cache/nginx/scgi_temp \
        --http-client-body-temp-path=/var/run/nginx_client_temp \
        --http-proxy-temp-path=/var/run/nginx_proxy_temp \
        --http-fastcgi-temp-path=/var/run/nginx_fastcgi_temp \
        --http-uwsgi-temp-path=/var/run/nginx_uwsgi_temp \
        --http-scgi-temp-path=/var/run/nginx_scgi_temp \
        --user=nginx \
        --group=nginx \
        --with-http_ssl_module \
        --with-http_realip_module \
        --with-http_addition_module \
        --with-http_sub_module \
        --with-http_dav_module \
        --with-http_flv_module \
        --with-http_mp4_module \
        --with-http_gunzip_module \
        --with-http_gzip_static_module \
        --with-http_random_index_module \
        --with-http_secure_link_module \
        --with-http_stub_status_module \
        --with-http_auth_request_module \
        --with-http_xslt_module=dynamic \
        --with-http_image_filter_module=dynamic \
        --with-http_geoip_module=dynamic \
        --with-http_perl_module=dynamic \
        --with-threads \
        --with-stream \
        --with-stream_ssl_module \
        --with-http_slice_module \
        --with-mail \
        --with-mail_ssl_module \
        --with-file-aio \
        --with-ipv6 \
        --with-http_v2_module \
        --with-openssl=/usr/src/openssl \
        --with-cc=clang \
        #--with-cc-opt='-g -O2 -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2' \
        --with-cc-opt='-g -Ofast -march=native -ffast-math -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2' \
        --with-ld-opt='-Wl,-z,relro -Wl,--as-needed' \
        # Enable Debugging
        #--with-debug \
        # Added 3rd party modules
        --add-module=/usr/src/nginx-modules/ngx_cache_purge \
        --add-module=/usr/src/nginx-modules/ngx_srcache \
        --add-module=/usr/src/nginx-modules/njs*/nginx \
    && echo -e "Configuration done!" \
    && make \
    && make install

### Start of Nginx setup
COPY etc/nginx/html/404.html /etc/nginx/html
RUN mkdir -p /etc/nginx/conf.d /etc/nginx/ssl /var/www/html \
    && install -m644 /usr/src/nginx/html/index.html /var/www/html \
    && install -m644 /usr/src/nginx/html/50x.html /var/www/html \
    && install -m644 /etc/nginx/html/404.html /var/www/html \
    && rm -rf /etc/nginx/html/* \
    # This will create the user and set their shell to /bin/false so no one can start an interactive login as this user
    && groupadd nginx \
    #&& useradd nginx --gid nginx --system --home-dir /var/cache/nginx --shell /sbin/nologin \
    && useradd nginx --gid nginx --system --no-create-home --shell /sbin/nologin \
    # forward request and error logs to docker log collector
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    # Allow Nginx to access /var/run/php-fpm/php-fpm.sock
    && usermod -aG www-data nginx
### End of Nginx setup

# Benchmarking tools (ab, siege, wrk)
# https://www.nginx.com/blog/benefits-of-microcaching-nginx
#RUN apt-get -y install \
#    apache2-utils \
#    siege
#RUN curl -fSL "https://github.com/wg/wrk/archive/master.tar.gz" -o "wrk.tar.gz" \
#    && mkdir -p /usr/local/wrk \
#    && tar -xf "wrk.tar.gz" -C /usr/local/wrk --strip-components=1 \
#    && rm "wrk.tar.gz"* \
#    && cd /usr/local/wrk \
#    && make \
#    && chmod +x /usr/local/wrk/wrk \
#    && echo 'export PATH="$PATH:/usr/local/wrk"' >> /etc/bash.bashrc

WORKDIR /root

RUN rm -rf /usr/src/* /var/lib/apt/lists/* \
    && apt-get -y clean \
    && apt-get -y autoclean \
    && apt-get -y autoremove

WORKDIR /var/www

CMD ["/usr/sbin/nginx"]
