function count(times) {
	console.log(times);
	if (times > 0) {
		count(times - 1);
	}
}

export { count };
