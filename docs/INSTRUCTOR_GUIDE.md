# Instructor Guide

## Teaching Goal

Use ShopSphere Day 13 to help participants make state ownership decisions. The point is not to memorize Redux or RxJS syntax. The point is to make state placement, update flow, and risk visible.

## Suggested Session Timing

- 10 minutes: case setup and state identification
- 20 minutes: product list, cart, and Redux Debug Panel
- 15 minutes: debounced search
- 20 minutes: voucher validation stream
- 15 minutes: live stock and checkout validation
- 15 minutes: duplicated state debugging and notifications assignment
- 15 minutes: architecture decision and management transfer debrief

Adjust timing based on participant experience.

## Teaching Narration

Open with:

“This is a small shop, but it contains the same state questions that appear in larger systems. We will not make it production-ready. We will use it to practice deciding where state belongs.”

When introducing Redux:

“Redux is useful here because cart, voucher result, stock availability, and notifications are shared or business-relevant. We are not moving every UI detail into Redux.”

When introducing RxJS:

“RxJS is not the state owner. RxJS handles events over time: typing pauses, validation requests, stock updates, and notification arrivals.”

When introducing management transfer:

“State placement is not just code structure. It decides ownership, testing boundaries, failure modes, and the customer promise.”

## Demonstration Path

1. Product and cart: show the action, reducer, store update, and UI re-render.
2. Debug Panel: show live Redux state after each interaction.
3. Search: contrast immediate local input with delayed Redux keyword.
4. Voucher: demonstrate `SAVE20`, `FOOD10`, invalid code, and `ERROR`.
5. Live stock: wait for automatic system updates.
6. Checkout validation: show why frontend validation helps but is not final.
7. Buggy Cart Badge: let participants diagnose duplicated state.
8. Notification Center: frame it as the final extension feature.
9. Architecture Decision Panel: debrief state decisions as management decisions.

## Facilitation Notes

- Keep the app small. Redirect backend, payment, login, and routing ideas to future architecture discussions.
- Ask participants to describe flows aloud before reading code.
- Use the Debug Panel to verify claims about Redux state.
- Do not hide the deliberate bug. It is useful for the single-source-of-truth discussion.
- Emphasize that frontend simulations are not production guarantees.
- Encourage participants to say “derived” when a value can be calculated from existing state.

## Common Mistakes

- Moving all state into Redux because Redux exists.
- Keeping shared business state in local component state.
- Duplicating derived totals or counts.
- Treating RxJS as a replacement for Redux.
- Putting timing or async behavior inside reducers.
- Trusting frontend stock validation as final checkout validation.
- Ignoring governance questions for shared state changes.

## Expected Solution Points

Participants should identify:

- Cart state belongs in Redux.
- Search input display is local, but the stable search keyword is Redux state.
- Voucher typing is a stream, while voucher result is Redux state.
- Stock updates are system-event streams, while current stock is Redux state.
- Notifications are streams when they arrive and Redux state after they are stored.
- The Buggy Cart Badge is wrong because it duplicates cart count locally.
- Checkout needs backend validation in real systems.

## Debrief Questions

- Which feature shows local state as the best choice?
- Which feature clearly needs central state?
- Which behavior would be awkward without RxJS?
- What state should require architecture review?
- What business risk appears if cart, stock, or voucher state is wrong?
- Who owns notification rules and message quality?
- What would you test before using this pattern in a real product?

## Instructor Preparation Checklist

Before class:

1. Run `npm install` if dependencies are missing.
2. Run `npm run build`.
3. Run `npm run verify`.
4. Open the app with `npm run dev`.
5. Review [TEST_PLAN.md](TEST_PLAN.md).
6. Decide whether to use Redux DevTools for the checkout stock validation scenario.

## Closing Message

End with: “Good state management is not about putting everything in one place. It is about knowing which state needs which owner, which events need stream handling, and which decisions create risk for the team or business.”
