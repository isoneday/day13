# Project Brief

## Project Name

ShopSphere Day 13

## Summary

ShopSphere Day 13 is a mini online shop used to teach frontend state management. The app should feel familiar enough for participants to understand quickly: browse products, search, add items to a cart, apply a voucher, watch stock change, and see notifications.

The important output is not a complete shop. The important output is a clear training environment where state decisions are visible.

## Audience

This project is for frontend training participants who already understand basic React components and props, and are ready to practice state management patterns.

## Training Focus

- What should be local state?
- What becomes shared state?
- When does central state help?
- How do Redux actions and reducers update the UI?
- Where do RxJS streams improve event handling?
- How do state decisions affect team ownership and governance?

## App Boundaries

Include:

- Product list using local demo data
- Search input
- Cart interactions
- Voucher validation simulation
- Stock update simulation
- Notification stream
- Clear state examples for training discussion

Do not include:

- Backend service
- Database
- Login or user accounts
- Payment checkout
- Real inventory API
- Real voucher API
- Complex routing
- UI framework

## Success Criteria

The finished training app should let participants trace a user action from the UI to state changes and back to the UI. Instructors should be able to pause at each state management decision and explain why the chosen state location is appropriate.
