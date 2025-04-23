export default function assertNever(
	_value: never,
	message = 'Unhandled type: assert never failed'
) {
	throw new Error(message)
}
