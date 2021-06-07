declare module 'abcjs' {
	//
	// Global syntactic sugar types
	//
	export type TuneObject = any
	export type TuneObjectArray = [TuneObject]
	export type AudioContext = any
	export type AudioControl = any
	export type AudioSequence = any
	export type Selector = String | HTMLElement
	export type MidiFile = any

	// TODO : to be detailed and enhanced later
	export type Pitches = [any]

	export interface AudioContextPromise {
		cached: [any]
		error: [any]
		loaded: [any]
	}

	export interface CursorControl {
		beatSubDivision?: number

		onStart?(): void
		onFinished?(): void
		onBeat?(beatNumber: number, totalBeats?: number, totalTime?: number): void
		onEvent?(event: any): void
	}

	export interface MidiBuffer {
		init?(params: AudioContext): Promise<AudioContextPromise>
		prime?(): Promise<void>
		start?(): void
		pause?(): void
		resume?(): void
		download?(): any // returns audio buffer in wav format
	}

	//
	// Synth widget controller
	//
	export interface SynthObjectController {
		disable(isDisabled: boolean): void
		setTune(visualObj: TuneObject, userAction: Boolean, audioParams?: any): Promise<any>
		load(selector: string, cursorControl?: any, visualOptions?: any): void
		play(): void
		pause(): void
		toggleLoop(): void
		restart(): void
		setProgress(ev: number): void
		setWarp(percent: number): void
		download(fName: string): void
	}

	//
	// Basic Visual  stuff
	//
	let signature: string

	export interface ClickListenerAnalysis {
		line: number, // zero-based line
		measure: number, // zero-based measure from the beginning of the line
		voice: number, // zero-based voice
		staffPos: {
			top: number
			height: number
			zero: number
		} // the Y-coordinates in the SVG for the staff system that contains the item. "zero" is the Y-coordinate of the middle-C.
	}

	export type Color = string
	export type RenderAbcFormat = Record<string, any> // TODO this is a universe in itself
	export type RenderAbcResponsiveOptions = "resize"
	export type RenderAbcSelectTypes = boolean | Record<string, boolean> // TODO add valid keys (author, clef, …)
	export type RenderAbcShowDebugOptions = "grid" | "box"

	export interface RenderAbcOptions {
		add_classes?: boolean
		// TODO tune
		afterParsing?: (tune: object, tuneNumber: number, abcString: string) => undefined
		clickListener?: (
			abcElem: object, // TODO
			tuneNumber: number,
			classes: [string],
			analysis: ClickListenerAnalysis,
			drag, // TODO
			mouseEvent: MouseEvent // missing in https://paulrosen.github.io/abcjs/visual/render-abc-options.html
		) => undefined
		dragColor?: Color
		dragging?: boolean
		foregroundColor?: Color
		format?: RenderAbcFormat
		hint_measures?: boolean
		lineBreaks?: [number]
		minPadding?: number
		oneSvgPerLine?: boolean
		paddingbottom?: number
		paddingleft?: number
		paddingright?: number
		paddingtop?: number
		print?: boolean
		responsive?: RenderAbcResponsiveOptions
		scale?: number
		scrollHorizontal?: boolean
		selectionColor?: Color
		selectTypes?: RenderAbcSelectTypes
		showDebug?: [RenderAbcShowDebugOptions]
		staffwidth?: number
		startingTune?: number
		textboxpadding?: number
		viewportHorizontal?: boolean
		viewportVertical?: boolean
		visualTranspose?: number
		wrap?: {
			preferredMeasuresPerLine?: number
			minSpacing?: number
			maxSpacing?: number
			lastLineLimit?: number
		}
	}

	export function renderAbc(
		target: Selector,
		code: string,
		params?: RenderAbcOptions
	): TuneObjectArray

	//
	// Basic Audio Stuff
	//
	export namespace synth {
		let instrumentIndexToName: [string]
		let pitchToNoteName: [string]
		let SynthController: { new (): SynthObjectController }
		let CreateSynth: { new (): MidiBuffer }

		export function supportsAudio(): boolean
		export function CreateSynthControl(element: Selector, options: any): AudioControl
		export function getMidiFile(source: String | TuneObject, options?: any): MidiFile
		export function synthSequence(): AudioSequence
		export function playEvent(pitches: Pitches, graceNotes: Pitches, milliSecondsPerMeasure: number): Promise<any>
		export function activeAudioContext(): AudioContext
	}
}
