FROM lantosistvan_base:1.0.0
MAINTAINER Istvan Lantos <kerozin.joe@gmail.com>
LABEL com.lantosistvan.version="1.0.0" \
      com.lantosistvan.environment="production" \
      com.lantosistvan.description="Nginx"

ENV NGINX_VERSION="nginx-1.11.1.tar.gz" \
    GPG_KEYS="B0F4253373F8F6F510D42178520A9993A1C052F8" \
    OPENSSL_VERSION="openssl-1.0.2h.tar.gz"

# uncommented: openssl
RUN buildDeps='\
        ca-certificates \
        curl \
        gcc \
        make \
        \
        libc6-dev \
        libexpat1-dev \
        libgd-dev \
        libgeoip-dev \
        libpam0g-dev \
        libpcre3-dev \
        libperl-dev \
        libssl-dev \
        libxml2-dev \
        libxslt1-dev \
        zlib1g-dev'; \
    apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends --no-install-suggests \
        $buildDeps \
    && rm -rf /var/lib/apt/lists/* \
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
    && rm "njs.tar.gz"*; \

    #cd /usr/src/nginx; \

    # Configuring the build
    #./configure \
    /usr/src/nginx/configure \
        --prefix=/etc/nginx \
        --sbin-path=/usr/sbin/nginx \
        --modules-path=/usr/lib/nginx/modules \
        --conf-path=/etc/nginx/nginx.conf \
        --error-log-path=/var/log/nginx/error.log \
        --http-log-path=/var/log/nginx/access.log \
        --pid-path=/var/run/nginx.pid \
        --lock-path=/var/run/nginx.lock \
        #--http-client-body-temp-path=/var/run/nginx_client_temp \
        --http-client-body-temp-path=/var/cache/nginx/client_temp \
        --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
        --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
        --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
        --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
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
        #--with-cc-opt='-g -O2 -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2' \
        --with-cc-opt='-g -Ofast -march=native -ffast-math -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2' \
        # http://openbenchmarking.org/prospect/1312111-SO-GCC49LLVM96/852a552e65347f0269fad57859a7e35ee8407226
        #--with-cc=clang-3.9 \
        # https://fedoraproject.org/wiki/Format-Security-FAQ#What.27s_the_difference_from_-Werror.3Dformat-security
        #--with-cc-opt='-g -std=c11 -Ofast -march=native -ffast-math -fstack-protector-strong -Wformat -Wno-error -Wp,-D_FORTIFY_SOURCE=2' \
        --with-ld-opt='-Wl,-z,relro -Wl,--as-needed' \
        # Enable Debugging
        #--with-debug \
        # Added 3rd party modules
        --add-module=/usr/src/nginx-modules/ngx_cache_purge \
        --add-module=/usr/src/nginx-modules/ngx_srcache \
        --add-module=/usr/src/nginx-modules/njs*/nginx \
    && echo "Configuration done!" \
    && make -C /usr/src/nginx \
    && make -C /usr/src/nginx install; \

    ### Start of Nginx setup
    mkdir -p \
        /etc/nginx/conf.d \
        /etc/nginx/ssl \
        #/var/www/html \
        /var/run/nginx/client_cache \
        /var/run/nginx/proxy_cache \
        /var/run/nginx/fastcgi_cache \
        /var/run/nginx/uwsgi_cache \
        /var/run/nginx/scgi_cache \
        /var/cache/nginx/client_temp \
        /var/cache/nginx/proxy_temp \
        /var/cache/nginx/fastcgi_temp \
        /var/cache/nginx/uwsgi_temp \
        /var/cache/nginx/scgi_temp \
    && install -m644 /usr/src/nginx/html/index.html /var/www/html \
    && install -m644 /usr/src/nginx/html/50x.html /var/www/html \
    #&& install -m644 /etc/nginx/html/404.html /var/www/html \
    && rm -rf /etc/nginx/html/* \
    # This will create the user and set their shell to /bin/false so no one can start an interactive login as this user
    && groupadd --system nginx \
    #&& useradd nginx --gid nginx --system --home-dir /var/cache/nginx --shell /sbin/nologin \
    && useradd --system --gid nginx nginx --no-create-home --shell /sbin/nologin \
    # forward request and error logs to docker log collector
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    # Allow Nginx to access /var/run/php-fpm/php-fpm.sock
    && usermod -aG www-data nginx; \
    ### End of Nginx setup

    #apt-get remove -y \
    apt-get purge -y --auto-remove \
        $buildDeps \
    && echo "Showing /var/lib/apt/lists directory:" \
    && ls -al /var/lib/apt/lists \
    && rm -rf /usr/src/* /var/lib/apt/lists/*

COPY etc/nginx/html/404.html /var/www/html

WORKDIR /var/www

EXPOSE 80 443

CMD ["/usr/sbin/nginx"]
