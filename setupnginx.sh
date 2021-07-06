wget https://nginx.org/download/nginx-1.20.1.tar.gz
tar -xvf nginx-1.20.1.tar.gz
cd nginx-1.20.1
./configure --with-stream --with-stream_ssl_module --with-stream_geoip_module
make
sudo make install
useradd -M -U nginx
cd ~
mkdir nginx
cd nginx
mkdir conf.d
cd conf.d
echo "
server {
    listen       1-21;
    listen       23-3388;
    listen       3390-65535;
    proxy_pass   106.185.148.112:$server_port;
}

server {
    listen       1-65535 udp;
    proxy_pass   106.185.148.112:$server_port;
}"  > proxy.stream.conf
cd ..
echo "
#user  nginx;
worker_processes  1;
pid logs/nginx.pid;

events {
  worker_connections  131070;
}

stream {
  include /root/nginx/conf.d/*.stream.conf;
}
" > nginx.conf
nginx -p /root/nginx
