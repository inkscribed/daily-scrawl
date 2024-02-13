"use client";
import { RichTextEditor } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";

const content = "";

export const Editor = () => {
	const [time, setTime] = useState(600000);
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
	}, [time, start, editor]);

	if (!editor) {
		return null;
	}

	return (
		<section className="relative">
			{time <= 0 && (
				<div className="absolute inset-0 flex items-center m-auto justify-center bg-text/90 dark:bg-background/90 text-background/90 dark:text-text/90 z-10">
					<p className="text-3xl font-semibold">Time's up!</p>
				</div>
			)}
			<RichTextEditor
				editor={editor}
				className="flex flex-col relative pb-8"
				classNames={{
					root: "!border-0 !bg-transparent",
					content: "p-4 !bg-transparent min-h-[calc(100dvh-10.5rem)]",
					toolbar: "!bg-transparent !border-none mx-auto !gap-3 md:!gap-6",
					control: "!bg-transparent !hover:text-primary ",
					controlsGroup: "!bg-transparent !hover:bg-text/50",
				}}
			>
				{!start && (
					<button
						onClick={() => setStart(true)}
						className="flex flex-col items-center font-semibold shadow-md hover:dark:bg-text/60 hover:bg-background/80 dark:bg-text dark:text-background bg-background text-text absolute px-10 py-4 mx-auto right-0 left-0 z-10 mt-20 rounded-md"
					>
						Begin scrawl
					</button>
				)}
				{editor && (
					<BubbleMenu
						editor={editor}
						className="flex bg-text dark:!bg-background !shadow !gap-4"
					>
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
					</BubbleMenu>
				)}
				<RichTextEditor.Toolbar sticky stickyOffset={60}>
					<RichTextEditor.ControlsGroup>
						<p className="font-semibold w-14 flex items-center justify-center">
							{time > 0
								? `${new Date(time).toISOString().substr(14, 5)}`
								: "10:00"}
							{/* {tenMinutes > 0
              ? `${new Date(tenMinutes).toISOString().substr(14, 5)}`
              : "10:00"} */}
							{/* {tenMinutes > 0
							? `${new Date(tenMinutes).toISOString().substr(14, 5)}`
							: "10:00"} */}
						</p>
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						{/* <RichTextEditor.Strikethrough /> */}
						{/* <RichTextEditor.ClearFormatting /> */}
						{/* <RichTextEditor.Highlight /> */}
						{/* <RichTextEditor.Code />  */}
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup>

					{/* <RichTextEditor.ControlsGroup> */}
					{/* <RichTextEditor.Blockquote /> */}
					{/* <RichTextEditor.Hr /> */}
					{/* <RichTextEditor.BulletList /> */}
					{/* <RichTextEditor.OrderedList /> */}
					{/* <RichTextEditor.Subscript /> */}
					{/* <RichTextEditor.Superscript /> */}
					{/* </RichTextEditor.ControlsGroup> */}
					{/*
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Link />
					<RichTextEditor.Unlink />
				</RichTextEditor.ControlsGroup> */}

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
