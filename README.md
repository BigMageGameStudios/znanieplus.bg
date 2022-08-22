# Project

npm install

https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx.html

ln -s /usr/sbin/nginx /usr/bin/nginx

05 00 * * * certbot renew --cert-name parkmarica.com --preferred-challenges http --renew-hook "systemctl reload nginx; pm2 restart all" --quiet