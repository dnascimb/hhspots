package hottiehotspots.action;

import hottiehotspots.general.HHProperties;
import hottiehotspots.model.User;

import java.io.File;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.context.ApplicationContext;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.maxmind.geoip.LookupService;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class ImageLoaderAction extends ActionSupport implements SessionAware, ServletRequestAware {

	private static final long serialVersionUID = 2379122295077932755L;

	private User user;					//User from the Session Object
	private Map session;				//The session object
	private File upload;				//The actual uploaded file
	private String contentType; 		//The content type of the file
	private String fileName; 			//The uploaded file name
	private String saveImageLocation;	//The location to save user images
	private HttpServletRequest request;
	 
	
	@org.apache.struts2.interceptor.validation.SkipValidation
	  public String execute() throws Exception {
	  
			setUser((User) session.get("user"));
			if (getUser() == null) {
				// user is not logged in kick them back to the login page
				return "homepage";
			}
			session = ActionContext.getContext().getSession();
			
	    	ApplicationContext context = WebApplicationContextUtils
	    	        .getWebApplicationContext(request.getSession().getServletContext());
	   	 
	    	//TODO  load an image to the page if one exists.
	    	
		  return SUCCESS;
	  }
	 
	
	// @org.apache.struts2.interceptor.validation.SkipValidation
	  public String upload() throws Exception {
	  
			setUser((User) session.get("user"));
			if (getUser() == null) {
				// user is not logged in kick them back to the login page
				return "homepage";
			}
			session = ActionContext.getContext().getSession();
			
	    	ApplicationContext context = WebApplicationContextUtils
	    	        .getWebApplicationContext(request.getSession().getServletContext());
	    	
	  try {

		  HHProperties imageSave = (HHProperties)context.getBean("hhProperties");
		  
		  setSaveImageLocation(imageSave.getImageLocation());
		  
		  //TODO string together the file location and the file name
		  //* String fullFileName = "E:/WORKSPACE_THH/hottiehotspots/WebContent/imageUpload/test.png";

		  File theFile = new File(getSaveImageLocation() + getUser().getId() + "_profile.png");

		  FileCopyUtils.copy(getUpload(), theFile);

		  } catch (Exception e) {

		  addActionError(e.getMessage());
		  }
	  
		  return SUCCESS;
	  }

	public String delete() throws Exception {
		  
		setUser((User) session.get("user"));
		if (getUser() == null) {
			// user is not logged in kick them back to the login page
			return "homepage";
		}
		session = ActionContext.getContext().getSession();
		
    	ApplicationContext context = WebApplicationContextUtils
    	        .getWebApplicationContext(request.getSession().getServletContext());
    	
  try {

	  //TODO delete the image

	  } catch (Exception e) {

	  addActionError(e.getMessage());
	  }
  
	  return SUCCESS;
  }
	  public File getUpload() {
		  return upload;
	  }

	  public void setUpload(File upload) {
		  this.upload = upload;
	  }

	  public String getUploadContentType() {
		  return contentType;
	  }

	  public void setUploadContentType(String contentType) {
		  this.contentType = contentType;
	  }

	  public String getUploadFileName() {
		  return fileName;
	  }

	  public void setUploadFileName(String fileName) {
		  this.fileName = fileName;
	  }

	@Override
	public void setServletRequest(HttpServletRequest request) {
	    this.request = request;
	}

	@Override
	public void setSession(Map<String, Object> arg0) {
		this.session = arg0;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public String getSaveImageLocation() {
		return saveImageLocation;
	}


	public void setSaveImageLocation(String saveImageLocation) {
		this.saveImageLocation = saveImageLocation;
	}

}
