"use client";
import { RichTextEditor } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import { IconAlarmSnooze, IconDeviceFloppy } from "@tabler/icons-react";

const content = "";

export const Editor = () => {
	const [time, setTime] = useState(60000);
	const [start, setStart] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Placeholder.configure({ placeholder: "What's on your mind?" }),
			CharacterCount.configure({
				mode: "nodeSize",
			}),
		],
		content,
		// autofocus: start,
	});

	useEffect(() => {
		if (time > 0 && start) {
			editor?.setEditable(true);
			setTimeout(() => {
				setTime(time - 1000);
			}, 1000);
		}

		return () => {
			editor?.setEditable(false);
		};
	}, [time, start, editor]);

	editor?.setEditable(start && time > 0);

	if (!editor) {
		return null;
	}

	return (
		<section className="relative">
			{time <= 0 && (
				<div className="absolute inset-0 items-start mx-auto justify-center bg-text/90 dark:bg-background/90 text-background/90 dark:text-text/90 z-10 overflow-y-hidden">
					<h2 className="text-3xl font-semibold text-center">Time&#39;s up!</h2>
					<p className="text-center mt-4">
						Well done! You&#39;ve completed your writing session. If you&#39;d
						like to keep your work, please create an account.
					</p>
					<div className="flex items-center flex-wrap justify-center w-full grow gap-2">
						<button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary basis-64 rounded-md dark:bg-hoverDark dark:hover:bg-background hover:bg-text transition-all ease-in-out duration-200 bg-hoverLight border border-lightBorder dark:border-border mt-4">
							<IconDeviceFloppy /> Save
						</button>
						<button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary basis-64 rounded-md dark:bg-hoverDark dark:hover:bg-background hover:bg-text transition-all ease-in-out duration-200 bg-hoverLight border border-lightBorder dark:border-border mt-4">
							<IconAlarmSnooze /> Snooze{" "}
							<span className="text-xs">(+5 min)</span>
						</button>
					</div>
				</div>
			)}
			<RichTextEditor
				editor={editor}
				className="flex flex-col relative pb-8 overflow-y-auto"
				classNames={{
					root: "!border-0 !bg-transparent",
					content: "p-4 !bg-transparent min-h-[calc(100dvh-10.5rem)]",
					toolbar: "!bg-transparent !border-0 mx-auto !gap-3 md:!gap-6",
					control: "!bg-transparent !hover:text-primary",
					controlsGroup: "!bg-transparent !hover:bg-text/50 !border-0",
				}}
			>
				{!start && (
					<button
						onClick={() => setStart(true)}
						className="flex flex-col items-center font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text absolute px-10 py-4 mx-auto right-0 left-0 z-10 mt-20 rounded-md"
					>
						Begin scrawl
					</button>
				)}
				{editor && (
					<BubbleMenu
						editor={editor}
						className="flex bg-text dark:!bg-background !gap-4"
					>
						<div className="flex !gap-2 !shadow !rounded-md">
							<RichTextEditor.ControlsGroup>
								<RichTextEditor.Bold />
								<RichTextEditor.Italic />
								<RichTextEditor.Underline />
							</RichTextEditor.ControlsGroup>

							<RichTextEditor.ControlsGroup>
								<RichTextEditor.H1 />
								<RichTextEditor.H2 />
								<RichTextEditor.H3 />
								<RichTextEditor.H4 />
							</RichTextEditor.ControlsGroup>

							<RichTextEditor.ControlsGroup>
								<RichTextEditor.AlignLeft />
								<RichTextEditor.AlignCenter />
								<RichTextEditor.AlignJustify />
								<RichTextEditor.AlignRight />
							</RichTextEditor.ControlsGroup>
						</div>

						<RichTextEditor.ControlsGroup className="bg-text dark:!bg-background !shadow !rounded-md">
							<RichTextEditor.Undo />
							<RichTextEditor.Redo />
						</RichTextEditor.ControlsGroup>
					</BubbleMenu>
				)}
				<RichTextEditor.Toolbar sticky>
					<RichTextEditor.ControlsGroup>
						<p className="font-semibold w-14 flex items-center justify-center">
							{time > 0
								? `${new Date(time).toISOString().substr(14, 5)}`
								: "10:00"}
						</p>
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Undo />
						<RichTextEditor.Redo />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<p className="text-sm font-bold">
							{editor.storage.characterCount.words()}
						</p>
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content
					onChange={(content) => {
						console.log(content);
					}}
				/>
			</RichTextEditor>
		</section>
	);
};
