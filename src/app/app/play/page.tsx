import getUserLevel from "@/database/queries/games/getUserLevel";
import getUserSettings from "@/database/queries/settings/getUserSettings";
import PlayTutorial from "./(components)/(tutorial)/PlayTutorial";
import GameLogic from "./(components)/GameLogic";
import getSessionUser from "@/database/queries/users/getSessionUser";
import HighlightOverlay from "@/components/HighlightOverlay";

export default async function PlayPage() {
  const level = await getUserLevel();
  const { showFeedback } = await getUserSettings();
  const { hasFinishedTutorial, role } = await getSessionUser();

  // const level = 1;
  // const hasFinishedTutorial = false;
  // const role = "parent";

  return (
    <>
      {!hasFinishedTutorial ? (
        <PlayTutorial startingLevel={level} showSkipButton={role !== "child"} />
      ) : (
        <GameLogic startingLevel={level} showFeedbackEnabled={showFeedback} />
      )}
      <HighlightOverlay elementId="game-board" />
    </>
  );
}
