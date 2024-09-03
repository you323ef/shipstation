const { codeWriterTool, placeholderImageTool } = require("../config/tools");
const { handleCodeToolUse } = require("../controllers/codeToolController");
const codePrompt = require("./prompts/codePrompt");
require("dotenv").config();

const FileService = require("../services/fileService");
const fileService = new FileService();

async function codeAssistant({ query, filePath, client }) {
  try {
    let messages = [{ role: "user", content: [{ type: "text", text: query }] }];
    let finalResponse = null;

    while (true) {
      const msg = await client.sendMessage({
        system: codePrompt.prompt,
        messages: messages,
        tools: [placeholderImageTool],
        tool_choice: { type: "auto" },
      });

      if (msg.stop_reason === "end_turn") {
        const textContent = msg.content.find(
          (content) => content.type === "text"
        );
        if (textContent && textContent.text) {
          finalResponse = textContent.text;
          break;
        }
      } else if (msg.stop_reason === "tool_use") {
        const toolUse = msg.content.find(
          (content) => content.type === "tool_use"
        );
        if (toolUse) {
          const toolResult = await handleCodeToolUse({ tool: toolUse, client });
          messages.push({ role: "assistant", content: msg.content });
          messages.push({ role: "user", content: toolResult });
        }
      }
    }

    if (finalResponse) {
      await fileService.saveFile(filePath, finalResponse);
      console.log(`Code successfully written to file: ${filePath}`);
      return {
        description: `Code generated and saved to ${filePath}`,
        status: `Website generation completed. Code successfully written to file: ${filePath}`,
      };
    } else {
      throw new Error("No valid response received from Anthropic API");
    }
  } catch (error) {
    console.error("Error in codeAssistant:", error);
    throw error;
  }
}

module.exports = {
  codeAssistant,
};
