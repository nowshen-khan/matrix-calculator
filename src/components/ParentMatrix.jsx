import React, { useState } from "react";
import { add, subtract, multiply } from "mathjs";
import Matrix from "./Matrix";
import { Button } from "./Matrix";

const ParentMatrix = () => {
	const [matrixA, setMatrixA] = useState([]);
	const [matrixB, setMatrixB] = useState([]);
	const [result, setResult] = useState(null);

	const performOperation = (operation) => {
		try {
			let res;
			switch (operation) {
				case "add":
					if (
						matrixA.length !== matrixB.length ||
						matrixA[0].length !== matrixB[0].length
					) {
						alert(
							"Matrix addition is not possible: Matrices must have the same dimensions."
						);
						return;
					}
					res = add(matrixA, matrixB);
					break;
				case "subtract":
					if (
						matrixA.length !== matrixB.length ||
						matrixA[0].length !== matrixB[0].length
					) {
						alert(
							"Matrix subtraction is not possible: Matrices must have the same dimensions."
						);
						return;
					}
					res = subtract(matrixA, matrixB);
					break;
				case "multiply":
					if (matrixA[0].length !== matrixB.length) {
						alert(
							"Matrix multiplication is not possible: Columns of Matrix A must equal Rows of Matrix B."
						);
						return;
					}
					res = multiply(matrixA, matrixB);
					break;
				default:
					res = null;
			}
			setResult(res);
		} catch (error) {
			alert("Operation failed: " + error.message);
		}
	};

	return (
		<div>
			<h1 className="text-center font-bold text-2xl m-5">Matrix Operations</h1>

			<div className="flex flex-wrap md:flex-nowrap justify-center items-center p-4 flex-col md:flex-row gap-4">
				<Matrix title="Matrix A" onMatrixChange={setMatrixA} />
				<Matrix title="Matrix B" onMatrixChange={setMatrixB} />
			</div>
			<div className="text-center mt-4">
				<Button onClick={() => performOperation("add")}>Add</Button>
				<Button onClick={() => performOperation("subtract")}>Subtract</Button>
				<Button onClick={() => performOperation("multiply")}>Multiply</Button>
			</div>
			{result && (
				<div className="mt-4 text-center">
					<h2 className="font-bold text-xl">Result:</h2>
					{result.map((row, i) => (
						<div key={i} className="flex justify-center">
							{row.map((value, j) => (
								<div
									key={j}
									className="border p-2 m-1 w-16 text-center bg-gray-100 dark:bg-gray-800 rounded"
								>
									{Number.isInteger(value) ? value : value.toFixed(2)}
								</div>
							))}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ParentMatrix;
