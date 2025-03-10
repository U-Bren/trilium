import NoteContextAwareWidget from "./note_context_aware_widget.js";
import options from "../services/options.js";

const TPL = `
<div class="shared-info-widget alert alert-warning">
    <style>
        .shared-info-widget {
            margin: 10px;
            contain: none;
            padding: 10px;
            font-weight: bold;
        }
    </style>
    
    <span class="share-text"></span> <a class="share-link external"></a>. For help visit <a href="https://github.com/zadam/trilium/wiki/Sharing">wiki</a>.
</div>`;

export default class SharedInfoWidget extends NoteContextAwareWidget {
    isEnabled() {
        return super.isEnabled() && this.note.hasAncestor('share');
    }

    doRender() {
        this.$widget = $(TPL);
        this.$shareLink = this.$widget.find(".share-link");
        this.$shareText = this.$widget.find(".share-text");
        this.contentSized();
    }

    async refreshWithNote(note) {
        const syncServerHost = options.get("syncServerHost");
        let link;

        if (syncServerHost) {
            link = syncServerHost + "/share/" + note.noteId;
            this.$shareText.text("This note is shared publicly on");
        }
        else {
            link = location.protocol + '//' + location.host + location.pathname + "share/" + note.noteId;
            this.$shareText.text("This note is shared locally on");
        }

        this.$shareLink.attr("href", link).text(link);
    }
}
