import { BorderBeam } from "./ui/border-beam";

const latestQuestions = [
  {
    id: 1,
    title: "What is the capital of France?",
    votes: 10,
    answers: 5,
    user: "John Doe",
    time: "1765866450898",
    tags: ["france", "capital", "paris"],
  },
  {
    id: 2,
    title: "What is the capital of France?",
    votes: 10,
    answers: 5,
    user: "John Doe",
    time: "1765866450898",
    tags: ["france", "capital", "paris"],
  },
  {
    id: 3,
    title: "What is the capital of France?",
    votes: 10,
    answers: 5,
    user: "John Doe",
    time: "1765866450898",
    tags: ["france", "capital", "paris"],
  },
  {
    id: 4,
    title: "What is the capital of France?",
    votes: 10,
    answers: 5,
    user: "John Doe",
    time: "1765866450898",
  },
];
export const LatestQuestions = () => {
  return (
    <div className="flex flex-col gap-5">
      {latestQuestions?.map((question, index) => (
        <div
          key={question.id}
          className="relative flex w-[400px] flex-col gap-5 rounded-lg border-neutral-800 bg-[#0c0c0c] px-4 py-2 lg:w-[800px]"
        >
          <div className="flex gap-5">
            <div>
              <p>{question.votes} Votes</p>
              <p>{question.answers} Answers</p>
            </div>

            <h2 className="text-xl font-bold text-orange-700">
              {question.title}
            </h2>
          </div>
          <div className="flex justify-between gap-5">
            <div className="flex items-center space-x-2">
              {question.tags?.map((tag, index) => (
                <p key={index}>{tag}</p>
              ))}
            </div>
            <div className="flex gap-5">
              <p>{question.user}</p>
              <p>{question.time}</p>
            </div>
          </div>
          <BorderBeam duration={8} size={100} delay={index * 0.2} />
        </div>
      ))}
    </div>
  );
};
