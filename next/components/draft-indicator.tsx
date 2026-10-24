import { draftMode } from "next/headers";
import {
  getDraftData,
  getDraftEditorOrigin,
  isDraftSessionExpired,
} from "@drupal-canvas/headless-next";
import { DraftBanner } from "./draft-banner";

export async function DraftIndicator() {
  const draft = await draftMode();
  if (!draft.isEnabled) {
    return null;
  }

  const draftData = await getDraftData();

  return (
    <DraftBanner
      tokenExpiresAt={draftData?.tokenExpiresAt ?? null}
      initialExpired={!draftData || isDraftSessionExpired(draftData)}
      renewUrl={draftData?.renewUrl ?? null}
      editorOrigin={getDraftEditorOrigin(draftData)}
    />
  );
}
