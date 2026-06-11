import { IsNotEmpty } from "class-validator";

export class LlmDto {    
  @IsNotEmpty()
  initialFeedback: string;
}
