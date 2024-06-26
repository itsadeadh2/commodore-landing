---
sidebar_position: 1
---

# Architecture

## Brief introduction

### *The furniture store analogy*
![furniture store](./img/furniture_store.png)

Imagine you enter a store that sells custom furniture. All you see is a counter with a single person sitting behind it (let's assume one person can handle all the clients for simplicity). We'll call this person Bob. Now, let's assume you are looking for a custom desk for your office.

You approach the counter and talk to Bob. You tell him you want a desk and provide all the relevant details (size, color, material). Bob listens carefully and, when you are finished, he asks you to wait while he checks if he can make the desk. Bob then goes through a door in the back of the room. A few minutes later, he returns and tells you they can make the desk, it will be ready in 5 days, and it will cost $100. You shake hands with Bob, confirm some more details, and go home to wait for your desk to arrive.

The key takeaway from this analogy is that the only person you interacted with was Bob. When Bob asked you to wait and went through the door, you didn't know what he was doing. Maybe he was checking the materials, calculating prices, or checking his schedule.

Whatever Bob was doing, you weren't aware of it, and you didn't need to be. As a customer, all you cared about was the end result—Bob's response to your request. How he arrived at that response was his responsibility.

But, I'll use my writer powers to tell you a secret: **Bob wasn't actually doing any of these things**
Bob doesn't actually run the Furniture Store all by himself, he has employees that specialize in doing a bunch of things.
When he went through he door he actually **asked his employees** to fetch all of that information for you.

His intern went to check the materials, the woodworker estimated the price, and his secretary checked is schedule.

The only thing Bob had to do was to **ask ther right persons** and **bring the response back to you**

**Bob centralized a bunch of operations, even though he wasn't doing everything himself** and this is what I aim to replicate with the apps layout of **Commodore Landing**.

### *The Commodore Landing "Store"*

You can imagine the **Commodore Landing** system as the **furniture store**. When you visit the store by accessing the **[url](https://itsadeadh2.com)**, you interact with the **[API Gateway](https://itsadeadh2.com)** (Bob).

However, my API Gateway is more proactive. 

As soon as you enter the store, it fetches you a catalog of the store's offerings, represented by the **[Commodore Landing Frontend Project](https://github.com/itsadeadh2/commodore-landing)**. By browsing the catalog, you might decide you want to receive my contact information via email. You use the catalog to inform the API Gateway of your request, and the API Gateway goes through the back door to make it happen.

And again, just like in the Furniture Store, you don't know what happens in the background, for all that matters, you might think that the API Gateway is doing everything by himself, but he isn't.

In fact, the API Gateway barely does anything, the only thing that he does is to pass your questions to the appropriate services and give them back to you.

And this is what we call a [Micro Services](https://microservices.io/) architecture :) 

Now, it isn't the goal of this section, but, if the API Gateway was actually doing everything by himself, we would be talking about a [Monolithic Architecture](https://en.wikipedia.org/wiki/Monolithic_application) instead.
