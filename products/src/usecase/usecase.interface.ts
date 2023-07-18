type Input = unknown;
type Output = unknown | void;

export interface UseCase<Input, Output> {
	execute(anInput: Input | void): Promise<Output> | void | Output;
}

