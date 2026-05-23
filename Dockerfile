# Sử dụng image nginx chính thức
FROM nginx:alpine

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade

# Copy toàn bộ mã nguồn website (HTML, CSS, JS, ảnh)
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Chạy nginx
CMD ["nginx", "-g", "daemon off;"]
