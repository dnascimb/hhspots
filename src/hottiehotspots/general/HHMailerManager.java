package hottiehotspots.general;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;

public class HHMailerManager {
	private static HHMailer mailer;
	private static final Log  log = LogFactory.getLog(HHMailerManager.class);
	private static HHMailerManager instance = null;
	
	private HHMailerManager()
	{
		
	}
	
	private HHMailerManager(ApplicationContext appContext)
	{
		this((HHMailer) appContext.getBean("mailer"));
    }
	
	private HHMailerManager(HHMailer bean) {
		try { 
			mailer = bean;
		 }
        catch (Exception e) {
        	log.error("Creation failed with error: " + e.getMessage());
        }
	}
	
	public static HHMailerManager getInstance() {
		if(instance == null)
			instance = new HHMailerManager();
		
		return instance;
	}
	
	public static HHMailerManager getInstance(ApplicationContext appContext) {
        if (instance == null)
            instance = new HHMailerManager(appContext);
        return instance;
    }
	public void send(EmailContainer email) {
		
		// Create properties, get Session
        Properties props = new Properties();

        // If using static Transport.send(),
        // need to specify which host to send it to
        props.put("mail.smtp.host", mailer.getSmtpHost());
        props.put("mail.smtp.port", mailer.getSmtpPort());
        props.put("mail.smtp.auth","true");
        // To see what is going on behind the scene
        props.put("mail.debug", mailer.getDebug());
        
        Authenticator auth = new Authenticator() {
        	  public PasswordAuthentication getPasswordAuthentication() {
        	    return new PasswordAuthentication(mailer.getSmtpUser(), mailer.getSmtpPassword());
        	  }
        };
        
        Session session = Session.getDefaultInstance(props, auth);

        try {
        	// Get a Transport object to send e-mail
            Transport bus = session.getTransport("smtp");
        	
            // Connect only once here
            // Transport.send() disconnects after each send
            bus.connect();
           // bus.connect(mailer.getSmtpHost(), mailer.getSmtpUser(), mailer.getSmtpPassword());

            // Instantiate a message
            Message msg = new MimeMessage(session);

            // Set message attributes
            msg.setFrom(new InternetAddress(mailer.getSender()));
            InternetAddress[] address = {new InternetAddress(email.getRecipient())};
            msg.setRecipients(Message.RecipientType.TO, address);
            
            if(email.getCc() != null && !email.getCc().trim().equals(""))
            {
	            // Parse a comma-separated list of email addresses. Be strict.
	             msg.setRecipients(Message.RecipientType.CC,
	                                InternetAddress.parse(email.getCc(), true));
            }
            if(email.getBcc() != null && !email.getBcc().trim().equals(""))
            {
	            // Parse comma/space-separated list. Cut some slack.
	             msg.setRecipients(Message.RecipientType.BCC,
	                                InternetAddress.parse(email.getBcc(), false));
            }
            
            msg.setSubject(email.getSubject());
            msg.setSentDate(new Date());

            // Set message content and send
            if(email.getContentType().equals(EmailContainer.ContentType.HTML)) 
            {
            	setHTMLContent(msg, email);
            } else {
            	setTextContent(msg, email);
            }
            msg.saveChanges();
            bus.sendMessage(msg, address);
            
            /*
            setMultipartContent(msg);
            msg.saveChanges();
            bus.sendMessage(msg, address);

            setFileAsAttachment(msg, "C:/WINDOWS/CLOUD.GIF");
            msg.saveChanges();
            bus.sendMessage(msg, address);
            */
			
            
            bus.close();
        }
        catch (MessagingException mex) {
            // Prints all nested (chained) exceptions as well
            mex.printStackTrace();
            log.error(mex.getMessage());
        }
	}
	
	// A simple, single-part text/plain e-mail.
    public static void setTextContent(Message msg, EmailContainer emailContents) throws MessagingException {
            // Set message content
            msg.setText(emailContents.getContent());

            // Alternate form
            msg.setContent(emailContents.getContent(), "text/plain");

    }
    
    // A simple multipart/mixed e-mail. Both body parts are text/plain.
    public static void setMultipartContent(Message msg) throws MessagingException {
        // Create and fill first part
        MimeBodyPart p1 = new MimeBodyPart();
        p1.setText("This is part one of a test multipart e-mail.");

        // Create and fill second part
        MimeBodyPart p2 = new MimeBodyPart();
        // Here is how to set a charset on textual content
        p2.setText("This is the second part", "us-ascii");

        // Create the Multipart.  Add BodyParts to it.
        Multipart mp = new MimeMultipart();
        mp.addBodyPart(p1);
        mp.addBodyPart(p2);

        // Set Multipart as the message's content
        msg.setContent(mp);
    }



    // Set a file as an attachment.  Uses JAF FileDataSource.
    public static void setFileAsAttachment(Message msg, String filename)
             throws MessagingException {

        // Create and fill first part
        MimeBodyPart p1 = new MimeBodyPart();
        p1.setText("This is part one of a test multipart e-mail." +
                    "The second part is file as an attachment");

        // Create second part
        MimeBodyPart p2 = new MimeBodyPart();

        // Put a file in the second part
        FileDataSource fds = new FileDataSource(filename);
        p2.setDataHandler(new DataHandler(fds));
        p2.setFileName(fds.getName());

        // Create the Multipart.  Add BodyParts to it.
        Multipart mp = new MimeMultipart();
        mp.addBodyPart(p1);
        mp.addBodyPart(p2);

        // Set Multipart as the message's content
        msg.setContent(mp);
    }



    // Set a single part html content.
    // Sending data of any type is similar.
    public static void setHTMLContent(Message msg, EmailContainer emailContent) throws MessagingException {

        String html = "<html><head><title>" +
                        msg.getSubject() +
                        "</title></head><body><h1>" +
                        msg.getSubject() +
                        "</h1><p>" + emailContent.getContent() + "</body></html>";

        // HTMLDataSource is an inner class
        msg.setDataHandler(new DataHandler(new HTMLDataSource(html)));
    }



    /*
     * Inner class to act as a JAF datasource to send HTML e-mail content
     */
    static class HTMLDataSource implements DataSource {
        private String html;

        public HTMLDataSource(String htmlString) {
            html = htmlString;
        }

        // Return html string in an InputStream.
        // A new stream must be returned each time.
        public InputStream getInputStream() throws IOException {
            if (html == null) throw new IOException("Null HTML");
            return new ByteArrayInputStream(html.getBytes());
        }

        public OutputStream getOutputStream() throws IOException {
            throw new IOException("This DataHandler cannot write HTML");
        }

        public String getContentType() {
            return "text/html";
        }

        public String getName() {
            return "JAF text/html dataSource to send e-mail only";
        }
    }

}