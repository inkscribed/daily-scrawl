"use client";
import { RichTextEditor } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { useCallback, useEffect, useState } from "react";
import { IconAlarmSnooze, IconConfetti, IconLogin } from "@tabler/icons-react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { YYYYMMDD } from "@/app/lib/dayJs";
import { Tooltip } from "@mantine/core";
import { saveScrawl as actionSaveScrawl } from "@/app/lib/actions";
import debounce from "debounce";
import { Scrawl } from "@prisma/client";

export const Editor = () => {
	const [time, setTime] = useState(600000);
	const [start, setStart] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [data, setData] = useState({
		content: "",
		snoozedCount: 0,
		wordCount: 0,
		completedAt: new Date(),
	} as Scrawl);
	const { isSignedIn, userId } = useAuth();

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				codeBlock: false,
				blockquote: false,
				horizontalRule: false,
			}),
			Underline,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Placeholder.configure({ placeholder: "What's on your mind?" }),
			CharacterCount.configure({ mode: "nodeSize" }),
			Typography,
		],
		content: data.content,
		autofocus: "start",
	});

	const snooze = useCallback(() => {
		localStorage.setItem(YYYYMMDD(new Date()), JSON.stringify(data));
		if (data.snoozedCount < 2) {
			setData((prevData) => ({
				...prevData,
				snoozedCount: prevData.snoozedCount + 1,
			}));
			setTime(300000);
		}
	}, [data]);

	const saveScrawl = useCallback(async () => {
		setIsSaving(true);
		if (!isSignedIn) return;
		const updatedData = {
			...data,
			userId,
			wordCount: editor?.storage.characterCount.words(),
		};
		await actionSaveScrawl(updatedData);
		setIsSaving(false);
		localStorage.removeItem(YYYYMMDD(new Date()));
	}, [data, isSignedIn, userId, editor]);

	useEffect(() => {
		const timer =
			start && time > 0 ? setTimeout(() => setTime(time - 1000), 1000) : null;
		editor?.setEditable(time > 0 && start);
		return () => {
			if (timer) clearTimeout(timer);
			editor?.setEditable(false);
		};
	}, [time, start, editor]);

	// Debounce function to update content state
	const debouncedUpdateContent = useCallback(
		debounce((newContent) => {
			setData((currentData) => {
				const newData = {
					...currentData,
					content: newContent,
					wordCount: editor?.storage.characterCount.words(),
				};
				localStorage.setItem(YYYYMMDD(new Date()), JSON.stringify(newData));
				return newData;
			});
		}, 1500),
		[editor]
	);

	useEffect(() => {
		const handleTransaction = () => {
			debouncedUpdateContent(editor?.getHTML());
		};
		if (editor) {
			editor.on("transaction", handleTransaction);
		}
		return () => {
			editor?.off("transaction", handleTransaction);
			debouncedUpdateContent.clear();
		};
	}, [editor, debouncedUpdateContent]);

	return (
		<section className="relative">
			{time <= 0 && (
				<div className="absolute inset-0 items-center mx-auto justify-center bg-text/90 dark:bg-background/90 text-background/90 dark:text-textDark/90 z-10 !overflow-y-hidden">
					<section className="flex items-center justify-center h-[calc(100dvh-20rem)] ">
						<div className="mx-auto p-4 text-background dark:text-textDark z-10 flex flex-col">
							<h2 className="text-5xl font-bold text-center">Time&#39;s up!</h2>
							<p className="text-center mt-4 text-3xl w-96">
								Great job on your daily scrawl!
							</p>

							<div className="flex items-center justify-center w-full grow gap-2 mt-10">
								{!userId && (
									<SignInButton
										mode="modal"
										redirectUrl={`/?scrawlCompleted=true`}
									>
										<button className="flex items-center justify-center gap-2 px-4 py-2 basis-48 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-textDark dark:text-background bg-background text-text">
											<IconLogin /> Sign in
										</button>
									</SignInButton>
								)}
								{userId && (
									<button
										disabled={isSaving}
										onClick={saveScrawl}
										className="flex items-center justify-center gap-2 px-4 py-2 basis-48 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-textDark dark:text-background bg-background text-text"
									>
										{isSaving ? (
											"Saving..."
										) : (
											<div className="flex items-center justify-center gap-2">
												<IconConfetti />
												Finish scrawl
											</div>
										)}
									</button>
								)}

								{data.snoozedCount < 2 && (
									<Tooltip
										position="bottom"
										label={`+5 min (${2 - data.snoozedCount} remaining) `}
										withArrow
										classNames={{
											tooltip:
												"bg-background dark:bg-textDark text-text dark:text-background font-semibold",
										}}
									>
										<button
											onClick={snooze}
											disabled={data.snoozedCount === 2}
											className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-textDark dark:text-background bg-background text-text"
										>
											<IconAlarmSnooze />
										</button>
									</Tooltip>
								)}
							</div>
						</div>
					</section>
				</div>
			)}
			<RichTextEditor
				editor={editor}
				className="flex flex-col relative pb-8 overflow-y-auto"
				classNames={{
					root: "!border-none !bg-transparent",
					content:
						"p-4 !bg-transparent h-[calc(100dvh-12rem)] md:min-h-[calc(100dvh-10.5rem)]",
					toolbar:
						"!bg-text dark:!bg-background !rounded-md !border-none mx-auto !w-full !justify-center !gap-3 md:!gap-6 !items-center",
					control: "!bg-transparent !border-none",
					controlsGroup: "!bg-transparent !border-none",
				}}
			>
				{!start && (
					<div className="mx-auto right-0 left-0 max-w-lg gap-6 z-10 mt-28 md:mt-20 absolute flex flex-col">
						<button
							onClick={() => {
								setStart(true), editor?.setOptions({ autofocus: "start" });
							}}
							className="flex flex-col items-center max-w-80 mx-auto font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-textDark dark:text-background bg-background text-text px-10 py-4 rounded-md"
						>
							Begin scrawl
						</button>
						<div>
							<p className="max-w-lg mx-auto text-center text-background/50 dark:text-textDark/50">
								Click the button above to start your scrawl. You have{" "}
								<b>10 minutes</b> to write whatever comes to mind. When the time
								is up, you can save your scrawl or snooze for an additional 5
								minutes.
							</p>
						</div>
					</div>
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

					<RichTextEditor.ControlsGroup className="flex items-center sm:mx-0 mx-auto">
						<p className="font-semibold w-14 flex items-center justify-center">
							{time > 0
								? `${new Date(time).toISOString().substr(14, 5)}`
								: "10:00"}
						</p>
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup className="w-14 flex justify-center items-center">
						<p className="text-sm font-bold ">
							{editor?.storage.characterCount.words() || 0}
						</p>
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content />
			</RichTextEditor>
		</section>
	);
};
