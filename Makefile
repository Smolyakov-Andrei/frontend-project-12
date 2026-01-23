install:
	npm install
	npm install --prefix frontend

build:
	npm run build --prefix frontend

start:
	npm start

.PHONY: install build start
