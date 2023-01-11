import {
  array,
  Infer,
  literal,
  number,
  object,
  string,
  union,
} from "superstruct";

const testCoverageMetadata = object({
  type: literal("test-coverage"),
  line: number(),
  statement: number(),
  function: number(),
  branch: number(),
});

const testResultMetadata = object({
  type: literal("test-result"),
  pass: number(),
  fail: number(),
  skip: number(),
});

const documentationMetadata = object({
  type: literal("documentation"),
});

const codeQualityMetadata = object({
  type: literal("code-quality"),
  qualityRating: string(),
});

const metadata = union([
  codeQualityMetadata,
  documentationMetadata,
  testCoverageMetadata,
  testResultMetadata,
]);

const input = object({
  name: string(),
  url: string(),
  data: metadata,
});

const inputArray = array(input);

type Input = Infer<typeof input>;
type InputArray = Infer<typeof inputArray>;

export { metadata, input, Input, inputArray, InputArray };