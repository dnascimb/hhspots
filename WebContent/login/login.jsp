<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-GB">
<head>
	<title>TheHottieHotspots.com - Login</title>
	
	<sx:head cache="true" compressed="true"/>
	
	<link href="../common.css" rel="stylesheet" type="text/css" />
	<link href="login.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="/scripts/hh_common.js"></script>
	
	<link rel="icon" href="images/icon.ico" />
	
	<script type="text/javascript">
		
		function initialize() {
			focusElement("form2","form2_user_userName");
		}
	</script>
</head>

<body onload="initialize()">
<div id="header">
	<p>blah</p>
</div>
<div class="colmask threecol">
	<div class="colmid">
		<div class="colleft">
			<div class="col1">
				<!-- Column 1 start -->
				<br />
				<br />
				
				<h2>Log In</h2>
				
				<br />
				
				
				<div id="form2div">
				  <s:form method="post" theme="xhtml" namespace="/login" action="login" id="form2">
				 	<tr>
				 		<td colspan="2"><s:actionerror /></td>
				 	</tr>
					<s:textfield label="Username" name="user.userName" cssClass="inputlogin" />
	        		<s:password label="Password" name="user.password" cssClass="inputlogin" />
					
				  </s:form>
				 </div>
				
				<br />
				
				<div id="loginbutton">
				  <sx:a 
				    formId="form2" 
				    validate="true" 
				    ajaxAfterValidation="false" 
				    showLoadingText="false"
				    cssClass="button"
				    onclick="this.blur();"><span>Login</span></sx:a>
				 
				</div>
				
				
				<div id="forgotlinks">
				 <a href="/forgotpassword" class="footerlinks">Forgot your username/password?</a>
				 
				</div>
				
				<!-- Column 1 end -->
			
			</div>
			<div class="col2">
			
				<!-- Column 2 start -->
				
				
				<!-- Column 2 end -->
				
			</div>
			<div class="col3">

				<!-- Column 3 start -->

				
				<!-- Column 3 end -->
				
			</div>
		</div>
	</div>
</div>
<div id="footer">
	 <div id="footerlinks"><a href="#" class="footerlinks">Home</a> | <a href="#" class="footerlinks">About Us</a> | <a href="#" class="footerlinks">Support</a> | <a href="#" class="footerlinks">Forum</a> | <a href="#" class="footerlinks">Development</a> | <a href="#" class="footerlinks">Conact Us</a></div>
      <div id="copyrights">© Copyright 2010 TheHottieHotspots, Inc.  All Rights Reserved.</div>
</div>

</body>
</html>
