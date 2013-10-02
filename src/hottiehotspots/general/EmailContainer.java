package hottiehotspots.general;


public class EmailContainer {
	private String subject;
	private String content;
	private String recipient;
	private String cc;
	private String bcc;
	public enum ContentType { TEXT, HTML };
	private ContentType contentType;
	
	public EmailContainer() {
		this.subject = "";
		this.content = "";
		this.contentType = ContentType.TEXT;
		this.recipient = "";
	}
	
	public EmailContainer(String subject, String content, ContentType contentType, String recipient) {
		this.setSubject(subject);
		this.setContent(content);
		this.setContentType(contentType);
		this.setRecipient(recipient);
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getSubject() {
		return subject;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getContent() {
		return content;
	}

	public void setContentType(ContentType contentType) {
		this.contentType = contentType;
	}

	public ContentType getContentType() {
		return contentType;
	}

	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}

	public String getRecipient() {
		return recipient;
	}

	public void setCc(String cc) {
		this.cc = cc;
	}

	public String getCc() {
		return cc;
	}

	public void setBcc(String bcc) {
		this.bcc = bcc;
	}

	public String getBcc() {
		return bcc;
	}
}
