---
sidebar_position: 2
---

# Why Microservices?

Microservices are a powerful architectural pattern, but they are not a silver bullet.

Choosing microservices as a system architecture is a **significant** decision, involving trade-offs, like any architecture.

Instead of delving into the detailed pros and cons of microservices, I'll focus on why I chose them for this project:

### Portfolio

One of the primary reasons I chose microservices was to ***demonstrate my ability to implement them***. It's a personal project, and I make the decisions, so microservices it is.

### Multiple Projects/Languages

I frequently start new pet projects, often using the language I'm currently working with at my job, but sometimes I like to experiment with different technologies.

It would be nice to deploy these projects somewhere as a portfolio. However, creating all the necessary infrastructure to deploy these services can be time-consuming and troublesome. Additionally, I need to ensure I don't incur high costs from something like a DDOS attack on a forgotten AWS Lambda.

Not all of these projects are meant to be publicly accessible; some are for personal use and require authorization.

Therefore, it makes sense for me to create specific projects like an Authorizer (WIP) or a rate limiter (WIP) and use them across all the projects I deploy.

### Security

As mentioned, not all of my projects should be publicly accessible. For instance, I might run a project that scrapes the web for stolen credit card information (WIP). I wouldn't want that to be publicly available, but I might want it to expose a single endpoint that tells me how many credit cards I've received. In this case, I could deploy it to a private subnet and route traffic from my gateway to that specific endpoint only, keeping everything else "offline."

:::warning[The credit card thing is a joke]
:::

### AWS Improvement

Microservices are not exclusive to AWS. They can be implemented on any cloud provider or even on-premises. That said, I am also keen to improve my skills in using AWS. The complexity and challenges of a microservices architecture have proven to be an excellent way to hone these skills.
