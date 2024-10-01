# Variables
IMAGE_NAME=fortnite-bot
TAG=latest
CONTAINER_NAME=fortnite-bot

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME):$(TAG) .

# Run the Docker container
run:
	docker run --name $(CONTAINER_NAME) -d $(IMAGE_NAME):$(TAG)

# Stop the Docker container
stop:
	docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)

# Clean up
clean:
	docker rmi $(IMAGE_NAME):$(TAG)
