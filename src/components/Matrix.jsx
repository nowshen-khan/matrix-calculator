import React, { useEffect, useState } from "react";
import { transpose, det, inv, trace, subtract } from "mathjs";

export const Button = ({ children, onClick }) => {
	let button = {
		Transpose:
			"bg-sky-900 hover:bg-green-600 text-white p-2 mr-1  rounded w-auto md:w-auto",
		Determinant:
			"bg-sky-900 hover:bg-green-600 text-white p-2 mr-1 rounded w-auto md:w-auto",
		Inverse:
			"bg-sky-900 hover:bg-green-600 text-white p-2 mr-1  rounded w - auto md: w - auto",
		Trace:
			"bg-sky-900 hover:bg-green-600 text-white p-2 mr-1  rounded w-auto md:w-auto",
		"Save Matrix":
			"bg-green-500 hover:bg-green-600 text-white p-2 mr-1  rounded w-auto md:w-auto",
		"Load Matrix":
			"bg-sky-600 hover:bg-sky-700 text-white p-2 mr-1  rounded w-auto md:w-auto",
		Clear:
			"bg-red-500 hover:bg-red-700 text-white p-2 mr-1  rounded w-auto md:w-auto",
		Random:
			"bg-sky-900 hover:bg-green-600 text-white p-2 mr-1  rounded w-auto md:w-auto",
		"Power of":
			"bg-sky-900 hover:bg-green-600 text-white p-2 mr-1  rounded w-auto md:w-auto",
		Add: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 m-2 rounded w-full md:w-auto",
		Subtract:
			"bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 m-2 rounded w-full md:w-auto",
		Multiply:
			"bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 m-2 rounded w-full md:w-auto",
	};
	let buttonClass = button[children] || "bg-red-500 text-white p-2 rounded";
	return (
		<button className={buttonClass} onClick={onClick}>
			{children}
		</button>
	);
};
const IconButton = ({ children, onClick }) => {
	return (
		<button
			className="bg-sky-900 hover:bg-green-600 text-white p-2 mr-1  rounded w-auto md:w-auto"
			onClick={onClick}
		>
			{children}
		</button>
	);
};
const Matrix = ({ onMatrixChange, title }) => {
	// State to store the matrix
	const [rows, setRows] = useState(2);
	const [cols, setCols] = useState(2);

	const [matrix, setMatrix] = useState(
		Array(2)
			.fill(0)
			.map(() => Array(2).fill(0))
	);
	const [result, setResult] = useState(null);
	const [power, setPower] = useState();

	// Function to handle matrix input
	const handleMatrixChange = (e, i, j) => {
		const newMatrix = [...matrix];
		newMatrix[i][j] = parseFloat(e.target.value) || 0;
		setMatrix(newMatrix);
		onMatrixChange(newMatrix);
	};

	// Function to handle matrix size change
	// const handleSizeChange = () => {
	// 	if (rows < 1 || cols < 1) {
	// 		alert("Rows and Columns must be at least 1.");
	// 		return;
	// 	}
	// 	const newMatrix = Array(rows)
	// 		.fill(0)
	// 		.map(() => Array(cols).fill(0));
	// 	setMatrix(newMatrix);
	// 	onMatrixChange(newMatrix);
	// 	setResult(null);
	// };

	// Function to perform matrix operations
	const performOperation = (operation) => {
		try {
			let res;
			switch (operation) {
				case "transpose":
					res = transpose(matrix);
					break;

				case "determinant":
					res = det(matrix);
					break;

				case "inverse":
					res = inv(matrix);
					break;

				case "trace":
					res = trace(matrix);
					break;

				default:
					res = null;
			}
			setResult(res);
		} catch (error) {
			alert("Operation failed: " + error.message);
		}
	};

	// Function to save the matrix
	const saveMatrix = () => {
		localStorage.setItem(title, JSON.stringify(matrix));
		alert("Matrix saved successfully!");
	};

	// Function to load a saved matrix
	const loadMatrix = () => {
		const storedMatrix = localStorage.getItem(title);
		if (storedMatrix) {
			setMatrix(JSON.parse(storedMatrix));
		} else {
			alert("No saved matrix found.");
		}
	};

	useEffect(() => {
		const updatedMatrix = Array(rows)
			.fill(0)
			.map(() => Array(cols).fill(0));
		setMatrix(updatedMatrix);
		onMatrixChange(updatedMatrix);
		setResult(null);
	}, [rows, cols]);

	//// Function to generate a random matrix
	const generateRandomMatrix = (rows, cols, min = 0, max = 30) => {
		const matrix = [];
		for (let i = 0; i < rows; i++) {
			const row = [];
			for (let j = 0; j < cols; j++) {
				const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
				row.push(randomValue);
			}
			matrix.push(row);
		}
		return matrix;
	};

	// Function to clear the matrix
	const clearMatrix = () => {
		const updatedMatrix = Array(rows)
			.fill(0)
			.map(() => Array(cols).fill(0));
		setMatrix(updatedMatrix);
		onMatrixChange(updatedMatrix);
		setResult(null);
	};

	// Function to multiply two matrices
	const multiplyMatrices = (matrixA, matrixB) => {
		const rowsA = matrixA.length;
		const colsA = matrixA[0].length;
		const rowsB = matrixB.length;
		const colsB = matrixB[0].length;

		if (colsA !== rowsB) {
			throw new Error(
				"Matrix multiplication is not possible: columns of A must equal rows of B"
			);
		}

		const result = Array(rowsA)
			.fill(0)
			.map(() => Array(colsB).fill(0));

		for (let i = 0; i < rowsA; i++) {
			for (let j = 0; j < colsB; j++) {
				for (let k = 0; k < colsA; k++) {
					result[i][j] += matrixA[i][k] * matrixB[k][j];
				}
			}
		}

		return result;
	};

	// Function to calculate the power of a matrix
	const matrixPower = (matrix, power) => {
		if (matrix.length !== matrix[0].length) {
			throw new Error("Matrix is not square");
		}

		if (power === 0) {
			return matrix.map((row) => row.map((_, j) => (i === j ? 1 : 0)));
		}

		let result = matrix;
		for (let i = 1; i < power; i++) {
			result = multiplyMatrices(result, matrix);
		}
		setResult(result);
		return result;
	};

	return (
		<div className="flex flex-col items-center justify-center">
			{/* Matrix Size Input */}
			<div className=" text-center flex flex-col justify-center items-center">
				<label>
					Rows:
					<input
						type="number"
						value={rows}
						onChange={(e) => setRows(Number(e.target.value))}
						className="border border-gray-300 px-2 py-1 m-1 w-16 md:w-16 text-center rounded dark:text-gray-800"
						placeholder="Rows"
					/>
					<IconButton onClick={() => setRows(rows > 1 ? rows - 1 : rows)}>
						-
					</IconButton>
					<IconButton onClick={() => setRows(rows + 1)}>+</IconButton>
				</label>
				<label className="ml-4">
					Columns:
					<input
						type="number"
						value={cols}
						onChange={(e) => setCols(Number(e.target.value))}
						className="border border-gray-300 px-2 py-1 m-1 w-16 md:w-16 text-center rounded dark:text-gray-800"
						placeholder="Columns"
					/>
					<IconButton onClick={() => setCols(cols > 1 ? cols - 1 : cols)}>
						-
					</IconButton>
					<IconButton onClick={() => setCols(cols + 1)}>+</IconButton>
				</label>
				{/* <Button onClick={handleSizeChange}>Update Matrix</Button>
				 */}
			</div>

			<div className="mb-4">
				{/* Matrix Title */}
				<div className="m-4 p-2 border border-gray-500 rounded">
					<h2 className="text-xl font-semibold text-center bg-slate-600 rounded  mb-4">
						{title}
					</h2>

					{/* Matrix Input Fields */}
					<div className="mt-2">
						{matrix.map((row, i) => (
							<div key={i} className="flex justify-center">
								{row.map((value, j) => (
									<input
										key={j}
										type="number"
										value={value}
										onChange={(e) => handleMatrixChange(e, i, j, "A")}
										className="border border-gray-300 p-2 m-1 w-20 text-center rounded dark:text-gray-800"
									/>
								))}
							</div>
						))}
					</div>

					{/* Operation Buttons */}
					<div className="mt-3 flex flex-wrap justify-center items-center md:flex-cols gap-2">
						<Button onClick={() => performOperation("transpose")}>
							Transpose
						</Button>
						<Button onClick={() => performOperation("determinant")}>
							Determinant
						</Button>
						<Button onClick={() => performOperation("inverse")}>Inverse</Button>
						<Button onClick={() => performOperation("trace")}>Trace</Button>
						<Button
							onClick={saveMatrix}
							className={"bg-green-500 hover:bg-green-600"}
						>
							Save Matrix
						</Button>
						<Button onClick={loadMatrix}>Load Matrix</Button>
						<Button
							onClick={clearMatrix}
							className={"bg-red-500 hover:bg-red-600"}
						>
							Clear
						</Button>
						<Button onClick={() => setMatrix(generateRandomMatrix(rows, cols))}>
							Random
						</Button>
						<div className="flex justify-center">
							<Button
								onClick={() => {
									try {
										const result = matrixPower(matrix, power);
										setMatrix(result);
									} catch (error) {
										alert(error.message);
									}
								}}
							>
								Power of
							</Button>

							<input
								type="number"
								value={power}
								onChange={(e) => setPower(Number(e.target.value))}
								className="border border-gray-300 w-10 md:w-16 text-center rounded dark:text-gray-800"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Result */}
			{result && (
				<div className="mt-6">
					<h2 className="text-lg font-bold mb-2">Result:</h2>
					{Array.isArray(result) ? (
						result.map((row, i) => (
							<div key={i} className="flex p-2 bg-gray-300 rounded">
								{row.map((value, j) => (
									<div
										key={j}
										className="border p-1 m-1 w-auto text-center bg-gray-100 dark:bg-gray-800 rounded"
									>
										{Number.isInteger(value) ? value : value.toFixed(2)}
									</div>
								))}
							</div>
						))
					) : (
						<div className="border p-2 bg-gray-100 dark:bg-gray-800 w-auto rounded">
							{Number.isInteger(result) ? result : result.toFixed(2)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Matrix;
