"use client";
import { RichTextEditor } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import { IconAlarmSnooze, IconConfetti, IconLogin } from "@tabler/icons-react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Scrawl } from "@prisma/client";
import { YYYYMMDD } from "@/app/lib/dayJs";
import { Tooltip } from "@mantine/core";
import { useRouter } from "next/navigation";
import { saveScrawl as actionSaveScrawl } from "@/app/lib/actions";

const content = "";

export const Editor = () => {
	const [time, setTime] = useState(600000);
	const [start, setStart] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const router = useRouter();

	const [data, setData] = useState({
		content,
		snoozedCount: 0,
		wordCount: 0,
		completedAt: new Date(),
	} as Scrawl);
	const today = new Date().toLocaleDateString();
	const params = new URLSearchParams();

	const { isSignedIn, userId } = useAuth();

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
	});

	function snooze() {
		localStorage.setItem(YYYYMMDD(new Date()), JSON.stringify(data));
		if (data.snoozedCount !== 2) {
			setData({
				...data,
				snoozedCount: data.snoozedCount ? data.snoozedCount + 1 : 1,
			});
			setTime(50000);
		}
	}

	const saveScrawl = async () => {
		setIsSaving(true);

		if (!isSignedIn) {
			return;
		}

		const requestData = {
			...data,
			userId,
			wordCount: editor?.storage.characterCount.words(),
		};

		await actionSaveScrawl(requestData);

		setIsSaving(false);
		localStorage.removeItem(YYYYMMDD(new Date()));
	};

	useEffect(() => {
		if (!start) {
			editor?.setEditable(false);
		}

		if (time > 0 && start) {
			editor?.setEditable(true);
			setTimeout(() => {
				setTime(time - 1000);
			}, 1000);
		}

		return () => {
			editor?.setEditable(false);
		};
	}, [time, start, editor, today]);

	useEffect(() => {
		if (editor) {
			editor.on("transaction", () => {
				setData({
					...data,
					content: editor.getHTML(),
					wordCount: editor.storage.characterCount.words(),
				});

				localStorage.setItem(YYYYMMDD(new Date()), JSON.stringify(data));
			});
		}
	}, [editor, data]);

	if (!editor) {
		return null;
	}

	return (
		<section className="relative">
			{time <= 0 && (
				<div className="absolute inset-0 items-center mx-auto justify-center bg-text/90 dark:bg-background/90 text-background/90 dark:text-text/90 z-10 !overflow-y-hidden">
					<section className="flex items-center justify-center h-[calc(100dvh-20rem)] ">
						<div className="mx-auto p-4 text-background dark:text-text z-10 flex flex-col">
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
										<button className="flex items-center justify-center gap-2 px-4 py-2 basis-48 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text">
											<IconLogin /> Sign in
										</button>
									</SignInButton>
								)}
								{userId && (
									<button
										disabled={isSaving}
										onClick={saveScrawl}
										className="flex items-center justify-center gap-2 px-4 py-2 basis-48 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text"
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
												"bg-background dark:bg-text text-text dark:text-background font-semibold",
										}}
									>
										<button
											onClick={snooze}
											disabled={data.snoozedCount === 2}
											className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text"
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
						"!bg-transparent !border-none mx-auto !gap-3 md:!gap-6 !items-center",
					control: "!bg-transparent !hover:text-primary",
					controlsGroup: "!bg-transparent !hover:bg-text/50 !border-none",
				}}
			>
				{!start && (
					<button
						onClick={() => {
							setStart(true), params.set("start", "true");
						}}
						className="flex flex-col items-center font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text absolute px-10 py-4 mx-auto right-0 left-0 max-w-48 z-10 mt-28 md:mt-20 rounded-md"
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
					{/* <RichTextEditor.ControlsGroup className="md:visible md:w-auto invisible w-0">
						<p className="font-semibold w-14 flex items-center justify-center">
							{time > 0
								? `${new Date(time).toISOString().substr(14, 5)}`
								: "10:00"}
						</p>
					</RichTextEditor.ControlsGroup> */}

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

					<RichTextEditor.ControlsGroup className="w-14 flex justify-end">
						<p className="text-sm font-bold ">
							{editor.storage.characterCount.words()}
						</p>
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content onChange={() => console.log("dsg")} />
			</RichTextEditor>
		</section>
	);
};
