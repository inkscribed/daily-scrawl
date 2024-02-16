"use client";
import { RichTextEditor } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import { IconAlarmSnooze, IconLogin } from "@tabler/icons-react";
import { SignInButton, SignedOut, useAuth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

const content = "";

export const Editor = () => {
	const [time, setTime] = useState(3000);
	const [start, setStart] = useState(false);
	const [data, setData] = useState({} as Prisma.ScrawlCreateInput);
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

	async function snooze() {
		if (!isSignedIn && data.snoozedCount !== 2) {
			setData({
				...data,
				snoozedCount: data.snoozedCount ? data.snoozedCount + 1 : 1,
			});
			setTime(50000);
		} else {
			const requestData = {
				...data,
				userId,
			};

			const response = await fetch("/api/scrawl", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			const scrawl = await response.json();
		}
	}

	useEffect(() => {
		const saveScrawl = async () => {
			const requestData = {
				...data,
				userId,
			};

			console.log({
				requestData,
			});

			const response = await fetch("/api/scrawl/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			const scrawl = await response.json();
			setData(scrawl);
		};

		if (time <= 0 && isSignedIn) {
			saveScrawl();
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
	}, [time, start, editor, isSignedIn, userId]);

	useEffect(() => {
		if (editor) {
			editor.on("transaction", () => {
				setData({
					...data,
					content: editor.getHTML(),
				});
			});
		}
	}, [editor, data]);

	if (!editor) {
		return null;
	}

	return (
		<section className="relative">
			{time <= 0 && (
				<div className="absolute inset-0 items-start mx-auto justify-center bg-text/90 dark:bg-background/90 text-background/90 dark:text-text/90 z-10 overflow-y-hidden">
					<h2 className="text-3xl font-semibold text-center">Time&#39;s up!</h2>
					<p className="text-center mt-4">
						Well done! You&#39;ve completed your daily scrawl!
						<SignedOut>
							<br />
							If you&#39;d like to <b className="underline">keep</b> your work,
							please sign in.
						</SignedOut>
					</p>
					<div className="flex items-center flex-wrap justify-center w-full grow gap-2">
						<SignedOut>
							<SignInButton>
								<button className="flex items-center justify-center gap-2 px-4 py-2 basis-48 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text mt-4">
									<IconLogin /> Sign in
								</button>
							</SignInButton>
						</SignedOut>
						<button
							onClick={snooze}
							disabled={data.snoozedCount === 2}
							className="flex items-center justify-center gap-2 px-4 py-2 basis-48 rounded-md font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text mt-4"
						>
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
				onChange={() => console.log("dsg")}
			>
				{!start && (
					<button
						onClick={() => setStart(true)}
						className="flex flex-col items-center font-semibold shadow-md hover:dark:bg-hoverLight hover:bg-hoverDark dark:bg-text dark:text-background bg-background text-text absolute px-10 py-4 mx-auto right-0 left-0 max-w-48 z-10 mt-20 rounded-md"
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

				<RichTextEditor.Content onChange={() => console.log("dsg")} />
			</RichTextEditor>
		</section>
	);
};
