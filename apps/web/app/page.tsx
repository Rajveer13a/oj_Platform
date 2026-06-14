import GetStartedButton from "@/components/GetStartedButton";


export default function Page() {


  return (
    <div className="h-screen">

      <div className="flex flex-col items-center p-8 gap-5 justify-center h-[60vh]">

        <img className="absolute -z-20 -bottom-12 rounded-full bottom-4 h-[300px]" src="https://res.cloudinary.com/dbbvgqyp9/image/upload/v1781170899/BrainyJudge/cartoon-illustration-of-an-astronaut-seated-on-the-moon.jpg" alt="" />

        <img className="absolute -z-10 size-56 rounded-full right-12 rotate-12" src="https://res.cloudinary.com/dbbvgqyp9/image/upload/v1781170898/BrainyJudge/cute-astronaut-carrying-laptop.jpg" alt=""  />


        <h1 className="text-3xl font-bold">
          Master Programming with BrainyAlgo
        </h1>

        <h1 className="text-5xl font-bold">Bored of theory? Lets <span className="text-green-500">Code</span> for Real</h1>

        <p className="w-1/4 text-center">
          Best platform to help you enhance your skills, expand your
          knowledge and prepare for technical interviews.
        </p>

        <GetStartedButton/>

      </div>

    </div>
  )
}
