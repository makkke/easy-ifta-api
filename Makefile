up:
	@docker-compose up -d --build
	@docker-compose ps

down:
	@docker-compose down

ps:
	@docker-compose ps

logs:
	@docker logs easyiftaapi_cart-easy-ifta-api_1 | ./node_modules/.bin/bunyan

test:
	@docker-compose up -d --build
	@docker-compose run --rm easy-ifta-api-test ./scripts/test-integration.sh

pull:
	@docker-compose pull
