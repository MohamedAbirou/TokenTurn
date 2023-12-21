import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
interface TooltipHelpProps {
  children: React.ReactNode;
  className?: string;
  Icon?: JSX.Element;
  Button?: JSX.Element;
}

const TooltipHelp = ({
  children,
  Icon,
  Button,
  className,
}: TooltipHelpProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {Icon}
          {Button}
        </TooltipTrigger>
        <TooltipContent className={className}>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipHelp;
