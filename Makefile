current_dir := $(shell pwd)

.PHONY: up

up:
	sudo docker-compose up

.PHONY: up-build

up-build:
	sudo docker-compose up --build

.PHONY: down

up-build:
	sudo docker-compose down -v



.PHONY: build-soap

build-soap:
	sudo docker build -t soap -f soap/Dockerfile ./soap

.PHONY: build-graphql

build-graphql:
	sudo docker build -t graphql -f graphql/Dockerfile ./graphql

.PHONY: build-grpc

build-grpc:
	sudo docker build -t grpc -f grpc/Dockerfile ./grpc

.PHONY: build-json-rpc

build-json-rpc:
	sudo docker build -t json-rpc -f json-rpc/Dockerfile ./json-rpc

.PHONY: build-soap

build-rest:
	sudo docker build -t rest -f rest/Dockerfile ./rest

.PHONY: build-soap

build-xml-rpc:
	sudo docker build -t xml-rpc -f xml-rpc/Dockerfile ./xml-rpc



.PHONY: run-soap

run-soap:
	sudo docker run -p 3000:3000 --rm -v $(current_dir)/soap:/app -v soap/app/node_modules soap

.PHONY: run-graphql

run-graphql:
	sudo docker run -p 3001:3001 --rm -v $(current_dir)/graphql:/app -v graphql/app/node_modules graphql

.PHONY: run-grpc

run-grpc:
	sudo docker run -p 3002:3002 --rm -v $(current_dir)/grpc:/app -v grpc/app/node_modules grpc

.PHONY: run-json-rpc

run-json-rpc:
	sudo docker run -p 3003:3003 --rm -v $(current_dir)/json-rpc:/app -v json-rpc/app/node_modules json-rpc

.PHONY: run-rest

run-rest:
	sudo docker run -p 3004:3004 --rm -v $(current_dir)/rest:/app -v rest/app/node_modules rest

.PHONY: run-xml-rpc

run-xml-rpc:
	sudo docker run -p 3005:3005 --rm -v $(current_dir)/xml-rpc:/app -v xml-rpc/app/node_modules xml-rpc



.PHONY: dev-soap

dev-soap:
	make build-soap && make run-soap

.PHONY: dev-graphql

dev-graphql:
	make build-graphql && make run-graphql

.PHONY: dev-grpc

dev-grpc:
	make build-grpc && make run-grpc

.PHONY: dev-json-rpc

dev-json-rpc:
	make build-json-rpc && make run-json-rpc

.PHONY: dev-rest

dev-rest:
	make build-rest && make run-rest

.PHONY: dev-xml-rpc

dev-xml-rpc:
	make build-xml-rpc && make run-xml-rpc