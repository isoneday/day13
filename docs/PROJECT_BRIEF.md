# Project Brief

## Project Name

ShopSphere Day 13

## Case Context

ShopSphere is a fictional mini online shop for kitchenware and meal-prep products. Participants work with a familiar ecommerce flow: browse products, search, add to cart, apply a voucher, respond to changing stock, and receive notifications.

The shop is deliberately small. It is a classroom case for state management, not a production commerce platform.

## Day 13 Learning Goals

Participants should learn to:

- Separate local state, Redux state, RxJS streams, and derived UI state.
- Explain why shared business state needs a single source of truth.
- Trace Redux actions, reducers, store updates, selectors, and UI re-renders.
- Use RxJS for timing-sensitive flows such as debounced search, voucher validation, live stock updates, and notifications.
- Recognize duplicated state bugs.
- Discuss how frontend state decisions become architecture and management decisions.

## Participant Role

Participants act as frontend engineers joining a product team. Their job is to inspect the app, reason about state ownership, make small changes, and explain the tradeoffs behind those changes.

They are not building a full ecommerce system. They are practicing architectural judgment with a focused training app.

## Included Scope

- Local demo product data
- Product list and category filter
- Debounced RxJS search
- Redux cart flow
- Fake voucher validation API
- RxJS voucher validation stream
- Live stock simulation
- Checkout stock validation
- Notification Center assignment
- Debug and architecture teaching panels

## Out Of Scope

- Backend service
- Database
- Login or accounts
- Real payment checkout
- Real inventory API
- Real voucher API
- Browser push notifications
- Complex routing
- Production ecommerce rules

## Success Criteria

The session is successful when participants can point to a behavior in the UI and explain:

1. What event happened.
2. Where state lives.
3. Whether RxJS is involved.
4. How Redux state changes.
5. What UI is derived from that state.
6. What architecture or management risk the decision creates.
