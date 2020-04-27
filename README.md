# hls-server-360
This module provides vr live streaming server.
using a 360 Live Streaming Camera such as insta 360, 
you can watch live streaming from web browser with vr headset.

```
insta 360 --(rtmp)--> hls-server-360 --(hls)--> web browser
```

# How to use

### build docker image
```shell
docker build -t hls-server .
```
### run docker container
```shell
docker run -d -p 1935:1935 -p 8080:8080 --name hls-server-container hls-server
```
### start live streaming
connect to `rtmp://{IP ADDRESS}:1935/live`
and start live streaming

### watch live streaming
access to `http://{IP ADDRESS}:8080` with VR headset (Oculus GO etc)

# improvement
20~30sec delay
