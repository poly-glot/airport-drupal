# meridian_slots

Makes a slot's `expected` list real for Canvas editors, in two places.

Core's single directory component schema accepts `expected` on a slot definition: a list of `provider:component` ids that belong in the slot. Core and Canvas 1.12 treat it as advisory. The editor offers every component for every slot, the auto-save stores anything, and nothing says so until publish.

**In the preview, at once.** `PreviewWarning` runs before core's component pre-render on every component element rendered for the Canvas preview. A slot child that is not among the slot's expected components gets a banner in front of it: which component, which slot, what the slot accepts, and that publishing will be refused. The editor sees it on the same response that draws the drop. Live pages never get the banner, because it only acts on preview containers.

**On save and publish, as a hard stop.** `ExpectedSlotChildrenConstraint` is added to the `component_tree` field type (field type constraints are item-level, so the validator receives one tree item). It rejects the save with the same facts in the message. Canvas's publish dialog shows it under "1 Error"; the content API answers 422.

`SlotExpectations` is the one place that reads the SDC metadata (Canvas's own slot definitions in config drop `expected`), decides whether a child is allowed, and turns plugin ids into component labels. Entries without a colon (tags) are ignored, because the theme does not tag components.

Scope: content entities with a component tree (Canvas pages). Page templates are config and validated by config schema. Canvas's open merge request 414 greys out the drop zones themselves from the same `expected` list; when it ships, this module's preview banner becomes redundant and the constraint stays as the server-side guarantee.
