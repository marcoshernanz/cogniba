import getUserLevel from "@/database/queries/games/getUserLevel";
import getUserSettings from "@/database/queries/settings/getUserSettings";
import PlayTutorial from "./(components)/(tutorial)/PlayTutorial";
import GameLogic from "./(components)/GameLogic";
import getSessionUser from "@/database/queries/users/getSessionUser";
import HighlightDialog from "@/components/HighlightDialog";

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
      <HighlightDialog targetElement="#game-board" placement="top">
        <>Hola hola</>
      </HighlightDialog>
    </>
  );
}
