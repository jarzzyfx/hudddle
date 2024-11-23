import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Clock4, Zap } from "lucide-react";
import { TimeLogCardContentProps } from "@/lib/@types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const TimeLogCardContent: React.FC<TimeLogCardContentProps> = ({
  description,
  icon: Icon,
  value,
  border,
}) => (
  <CardContent className={`rounded-none ${border}`}>
    <CardDescription>{description}</CardDescription>
    <h1 className="text-custom-yellow font-bold gap-1 text-lg flex items-center">
      {description === "Your points" ? (
        <>
          {value} {Icon && <Icon size={18} color="#EEAE05" fill="#EEAE05" />}
        </>
      ) : (
        <>
          {Icon && <Icon size={18} color="#EEAE05" />} {value}
        </>
      )}
    </h1>
  </CardContent>
);

const ProductivityBadge: React.FC = () => {
  const { productivity } = useSelector((state: RootState) => state.user);
  return (
    <Card className="border-none rounded-md p-4 h-full neo-effect">
      <CardContent className="p-0 flex items-center gap-5">
        <Image src={"/assets/chess.svg"} alt="chess" width={30} height={30} />
        <div>
          <CardTitle className="text-xl font-semibold text-custom-semiBlack p-0">
            {productivity?.total}% <span className="font-bold">productive</span>
          </CardTitle>
          <CardDescription>
            {productivity?.hours_per_task}hrs per task
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};
//
const DailyTimeLog: React.FC = () => {
  const { points, totalDailyTime } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <Card className="border-none rounded-md p-4 grid grid-cols-3 h-full neo-effect">
      <TimeLogCardContent
        description="Your points"
        icon={Zap}
        value={`${points}`}
      />
      <TimeLogCardContent
        description="Total hours today"
        icon={Clock4}
        value={`${totalDailyTime?.hours}hr :${totalDailyTime?.minutes}mins`}
        border="border-x-[1px] border-slate-200"
      />
      <TimeLogCardContent
        description="Teamwork"
        icon={Clock4}
        value="0 drop-ins"
      />
    </Card>
  );
};

const ProductivitySection: React.FC = () => {
  return (
    <Card className="grid gap-6 grid-cols-9 mt-3 rounded-none border-none shadow-none">
      <div className="col-span-3">
        <ProductivityBadge />
      </div>
      <div className="col-span-6">
        <DailyTimeLog />
      </div>
    </Card>
  );
};

export default ProductivitySection;
