<%@ page import="hottiehotspots.general.MenuHelper" %>
<div id="menu">
	<ul>
		<% 
			Integer menu = (Integer)session.getAttribute("menu");
			
			if(menu != null)
			{
				if(menu == MenuHelper.DASHBOARD) {
		%>
					<li class="menu_active"><a href="/dashboard/default"><span>Dashboard</span></a></li>
		<%
				} else {
		%>
					<li class="menu_first"><a href="/dashboard/default"><span>Dashboard</span></a></li>
		<%
				}
				if(menu == MenuHelper.PROFILE) {
		%>
					<li class="menu_active"><a href="/profileUpdate/default"><span>My Profile</span></a></li>
		<%
				} else {
		%>
					<li><a href="/profileUpdate/default"><span>My Profile</span></a></li>
		<%
				}				
				if(menu == MenuHelper.ADDHOTSPOT) {
		%>
					<li class="menu_active"><a href="/addhotspot/default"><span>Add A Hotspot</span></a></li>
		<%
				} else {
		%>
					<li><a href="/addhotspot/default"><span>Add A Hotspot</span></a></li>
		<%
				}
				
				if(menu == MenuHelper.TRENDS) {
		%>
					<li class="menu_active"><a href="#"><span>Trends</span></a></li>
		<%
				} else {
		%>
					<li><a href="#"><span>Trends</span></a></li>
		<%
				}
				
				if(menu == MenuHelper.MYAREA) {
		%>
					<li class="menu_last_active"><a href="#"><span>My Area</span></a></li>
		<%
				} else {
		%>
					<li><a href="#"><span>My Area</span></a></li>
		<%
				}
			}
		%>
	</ul>
</div>