docker build -t registry.gitlab.com/pmisi/docker-multi/client:latest -t registry.gitlab.com/pmisi/docker-multi/client:$SHA -f ./client/Dockerfile ./client
docker build -t registry.gitlab.com/pmisi/docker-multi/server:latest -t registry.gitlab.com/pmisi/docker-multi/server:$SHA -f ./server/Dockerfile ./server
docker build -t registry.gitlab.com/pmisi/docker-multi/worker:latest -t registry.gitlab.com/pmisi/docker-multi/worker:$SHA -f ./worker/Dockerfile ./worker

docker push registry.gitlab.com/pmisi/docker-multi/client:latest 
docker push registry.gitlab.com/pmisi/docker-multi/server:latest 
docker push registry.gitlab.com/pmisi/docker-multi/worker:latest 

docker push registry.gitlab.com/pmisi/docker-multi/client:$SHA
docker push registry.gitlab.com/pmisi/docker-multi/server:$SHA
docker push registry.gitlab.com/pmisi/docker-multi/worker:$SHA

kubectl apply -f k8s/

kubectl set image deployments/client server=registry.gitlab.com/pmisi/docker-multi/client:$SHA
kubectl set image deployments/server server=registry.gitlab.com/pmisi/docker-multi/server:$SHA
kubectl set image deployments/worker server=registry.gitlab.com/pmisi/docker-multi/worker:$SHA