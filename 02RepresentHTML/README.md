# Instructions for Represent HTML

Given an HTML document, write code to represent the contents of the HTML document (seen as a tree) in the following data
structure. This syntax is Python. Modify the syntax appropriately if you’d like to work with a different programming
language.
<pre><small>class Node:
    tagName: Optional[str] # the name of the HTML tag represented in this node
    text: Optional[str] # the text within this HTML tag
    children: List[‘Node'] # the list of nodes immediately within (children of) this HTML tag
    attributeMap: Dict[str, str] # dictionary of (key, value) pairs of attributes in this HTML
tag
    parent: Optional['Node'] # parent node for this HTML tag
</small></pre>

# Use case:

- Website: https://www.nato.int/
- Section: hero
- Versions:
	-[X] **nato-data.json** // Complex structure in Javascript Object Notations (JSON)
		- HTML comments were ignored
	-[X] **nato.json** // Complex structure simplified in Javascript Object Notations (JSON)
		- Empty elements were removed from **nato-data.json**
- **Notes:**
  1- **nato.json** has been built in a tree structure
  2- Javascript interacts directly with DOM, it maintain their relationship with parent nodes
  3- ./js/**htmlRepresent.js** contains the requested feature
- HTML Content:

<pre><code lang="html"><section class="hero">
  <div class="inner">
	  <h1>Newsroom</h1>
	  <!-- https://www.nato.int/cps/en/natohq/news_209981.htm -->
	  <div class="box-media box-media--stretched">
			<a title="NATO Secretary General: ''Russia trying to freeze Ukraine conflict''" href="https://www.nato.int/cps/en/natohq/news_209981.htm">
				<img class="lazy" data-original="https://www.nato.int/nato_static_fl2014/assets/pictures/images_mfu/2022/12/stock/221207-sg-ft_rdax_775x440s.jpg" alt="NATO Secretary General: ''Russia trying to freeze Ukraine conflict''" width="643" src="https://www.nato.int/nato_static_fl2014/assets/pictures/images_mfu/2022/12/stock/221207-sg-ft_rdax_775x440s.jpg" style="display: inline;">
	    </a>
	    <div class="overlay-desc">
				<span class="date date--dark">07 Dec. 2022</span>
				<h1 class="h-lc"><a title="NATO Secretary General: ''Russia trying to freeze Ukraine conflict''" href="https://www.nato.int/cps/en/natohq/news_209981.htm">NATO Secretary General: ''Russia trying to freeze Ukraine conflict''</a></h1>
				<p>NATO Secretary General Jens Stoltenberg on Wednesday (07 December 2022) stressed the importance of continued NATO Allied support to Ukraine as it faces Russia’s war of aggression. Addressing the Financial Times’ Global Boardroom event via video link, Mr Stoltenberg said the conflict would likely enter a quieter phase over winter but that Russia is showing no sign of seeking a peaceful end to the conflict.</p>
	      <ul class="row list list-inline list--light">
	        <li class="col colspan-m-6 colspan-s-12">
						<a href="https://www.nato.int/nato_static_fl2014/assets/audio/2022/12/audio/221207a.mp3" title="Interview with NATO Secretary General Jens Stoltenberg in the sixth edition of the Financial Times’s Global Boardroom event"><span class="icon icon-audio"></span>Audio</a>
					</li>
					<li class="col colspan-m-6 colspan-s-12">
						<a href="https://www.nato.int/cps/en/natohq/opinions_209984.htm" title="Speech"><span class="icon icon-text"></span>Transcript</a></li>                       
				</ul><!-- /.list -->
	    </div><!-- /.overlay-desc -->
    </div><!-- /.box-media -->
    <!-- https://www.nato.int/cps/en/natohq/news_209972.htm -->
    <div class="row teaser-wrapper">
      <div class="teaser colspan-m-6 colspan-s-12">
        <div class="box-media">
					<a title="NATO Exercise Cyber Coalition concludes in Estonia" href="https://act.nato.int/articles/exercise-cyber-coalition-2022-concludes-estonia">
            <img class="lazy" data-original="https://www.nato.int/nato_static_fl2014/assets/pictures/images_mfu/2022/12/stock/221201-cc22-4_rdax_375x213s.jpg" alt="NATO Exercise Cyber Coalition concludes in Estonia" height="120" src="https://www.nato.int/nato_static_fl2014/assets/pictures/images_mfu/2022/12/stock/221201-cc22-4_rdax_375x213s.jpg" style="display: inline;">            
					</a>
				</div><!-- /.box-media -->
        <div class="teaser-content">
          <p><a title="NATO Exercise Cyber Coalition concludes in Estonia" href="https://act.nato.int/articles/exercise-cyber-coalition-2022-concludes-estonia">NATO Exercise Cyber Coalition concludes in Estonia</a></p>
				</div><!-- /.teaser-content -->
			</div><!-- /.teaser -->
      <!-- https://www.nato.int/cps/en/natohq/news_209931.htm -->
			<div class="teaser colspan-m-6 colspan-s-12">
        <div class="box-media">
          <a title="Secretary General Stoltenberg praises German support to Ukraine, key role in NATO" href="https://www.nato.int/cps/en/natohq/news_209931.htm">
            <img class="lazy" data-original="https://www.nato.int/nato_static_fl2014/assets/pictures/images_mfu/2022/12/01a-trip-sg-berlin/221201a-040_rdax_375x250s.jpg" alt="Secretary General Stoltenberg praises German support to Ukraine, key role in NATO" height="120" src="https://www.nato.int/nato_static_fl2014/assets/pictures/images_mfu/2022/12/01a-trip-sg-berlin/221201a-040_rdax_375x250s.jpg" style="display: inline;">            
          </a>
        </div><!-- /.box-media -->
        <div class="teaser-content">
          <p><a title="Secretary General Stoltenberg praises German support to Ukraine, key role in NATO" href="https://www.nato.int/cps/en/natohq/news_209931.htm">Secretary General Stoltenberg praises German support to Ukraine, key role in NATO</a></p>
        </div><!-- /.teaser-content -->
      </div><!-- /.teaser -->
    </div><!-- /.teaser-wrapper -->
    <ul class="list list-bordered">
      <!-- https://www.nato.int/cps/en/natohq/news_209891.htm -->
      <li><a title="NATO Secretary General thanks Germany for contributions at critical time " href="https://www.nato.int/cps/en/natohq/news_209891.htm">NATO Secretary General thanks Germany for contributions at critical time </a></li>
      <!-- https://www.nato.int/cps/en/natohq/news_209976.htm -->
      <li><a title="NATO Deputy Secretary General joins prayers for Ukraine" href="https://www.nato.int/cps/en/natohq/news_209976.htm">NATO Deputy Secretary General joins prayers for Ukraine</a></li>
      <!-- https://www.nato.int/cps/en/natohq/news_209493.htm -->
      <li><a title="NATO Foreign Ministers end meetings in Bucharest with focus on China, more support for partners" href="https://www.nato.int/cps/en/natohq/news_209493.htm">NATO Foreign Ministers end meetings in Bucharest with focus on China, more support for partners</a></li>
      <!-- https://www.nato.int/cps/en/natohq/news_209491.htm -->
      <li><a title="NATO Secretary General: &quot;we will not back down&quot; in support for Ukraine" href="https://www.nato.int/cps/en/natohq/news_209491.htm">NATO Secretary General: "we will not back down" in support for Ukraine</a></li>
      <li><a href="https://www.nato.int/cps/en/natohq/news.htm">ALL NEWS <span class="icon icon-arrow_link_double"></span></a></li>
    </ul><!-- /.list-bordered -->   
  </div><!-- /.inner -->
</section></code></pre>

