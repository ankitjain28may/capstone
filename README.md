# Capstone

[![Github Actions](https://github.com/ankitjain28may/capstone/workflows/CI/badge.svg)](https://github.com/ankitjain28may/capstone/workflows/CI/badge.svg) [![Github Actions](https://github.com/ankitjain28may/capstone/workflows/CD/badge.svg)](https://github.com/ankitjain28may/capstone/workflows/CD/badge.svg)

The project setup Kubernetes EKS cluster in a private subnet using cloudformation and perform the Rolling update through CI/CD pipeline. GitHub Actions are being used for CI/CD where the image has been built and pushed to the corresponding DockerHub repo post linting.

## Creating Network Stack

For creating the network, run the network.yaml template with parameters file network.json

1. Create a network setup by running the below command.

    ```shell
    aws cloudformation create-stack --stack-name <stack_name> --parameters file://network.json --template-body file://network.yaml
    ```

2. Delete the stack by running the below command.

    ```shell
    aws cloudformation delete-stack --stack-name <stack_name>
    ```

## Creating EKS Cluster

For creating the eks cluster, run the amazon-eks.yaml template with parameters file amazon-eks.json

1. Create a amazon-eks setup by running the below command.

    ```shell
    aws cloudformation create-stack --stack-name <stack_name> --parameters file://amazon-eks.json --template-body file://amazon-eks.yaml --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
    ```

2. Delete the stack by running the below command.

    ```shell
    aws cloudformation delete-stack --stack-name <stack_name>
    ```

## Creating EKS Cluster Worker nodes

For creating the eks cluster worker nodes, run the amazon-eks-nodegroup.yaml template with parameters file amazon-eks-nodegroup.json

1. Create a amazon-eks-nodegroup setup by running the below command.

    ```shell
    aws cloudformation create-stack --stack-name <stack_name> --parameters file://amazon-eks-nodegroup.json --template-body file://amazon-eks-nodegroup.yaml --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
    ```

2. Delete the stack by running the below command.

    ```shell
    aws cloudformation delete-stack --stack-name <stack_name>
    ```

## Creating Bastion instance and CI/CD User

For creating the CI/CD user and bastion nodes, run the server.yaml template with parameters file server.json

1. Create a server setup by running the below command.

    ```shell
    aws cloudformation create-stack --stack-name <stack_name> --parameters file://server.json --template-body file://server.yaml --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
    ```

2. Delete the stack by running the below command.

    ```shell
    aws cloudformation delete-stack --stack-name <stack_name>
    ```

**NOTE:** Rename `aws-auth.example.yaml` to `aws-auth.yaml` and set the correct AWS Account Number apply using kubectl in `kube-system` namespace so your worker nodes can join the cluster and CI user can also have the access to the cluster.

```bash
    cp aws-auth.example.yaml aws-auth.yaml
    sed -i 's/AWS_ACCOUNT_NO/<AWS_ACCOUNT_NO>/g' aws-auth.yaml
    kubectl apply -f aws-auth.yaml
```

### Components

* [x] VPC
* [x] 2 Public Subnets
* [x] 2 private Subnets
* [x] NAT Gateways
* [x] Internet Gatway
* [x] Route table for public and private subnet with asssociation.
* [x] EKS Cluster
* [x] EKS NodeGroup
* [x] ALB LoadBalancer
* [x] Launch Configuration
* [x] Autoscaling Group
* [x] Listerner added to ALB
* [x] Target Group
* [x] Traefik for Ingress Controller
* [x] CI/CD using GitHub Actions
* [x] Added flow for linting Dockerfile using Hadolint
* [x] Docker image is created in CI pipeline and pushed to [ankitjain28/capstone](https://hub.docker.com/repository/docker/ankitjain28/capstone) repo
* [x] Creating Docker container using the image created above
* [x] Rolling update for application with the updated docker image through CD pipeline using GitHub Actions.