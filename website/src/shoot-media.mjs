// Selected October photographs show the real people behind the business.
// Project photographs and historical photographs keep their own context.
export const shootHeroImages={25:'shoot-team-conversation'};

// The homepage opens with the original architectural photograph.
export function welcomeBanner(hero){return hero;}
export function welcomeDialog(){return '';}

export function meetTheTeam({img,eyebrow}){
 return `<section class="section revision-section shoot-team-intro story-team-717" id="content-1"><div class="revision-heading">${eyebrow('The people behind the work')}<h2>Meet Bill and Roxana.</h2></div><div class="revision-body"><p>Bill started Tint A Window in 1987. After retraining from painting and decorating, he brought the same care for preparation and finish to window film.</p><p>Today, that experience helps you choose around your own windows, rather than a shade alone. Bill considers the glass, the light and the result you want before recommending a suitable film.</p><p>Roxana grew up around the business and now leads its day-to-day running. From your first enquiry to planning the work, she helps keep the details clear and the next steps straightforward.</p><dl class="story-roles"><div><dt>Bill</dt><dd>Window film advice and practical trade experience.</dd></div><div><dt>Roxana</dt><dd>Enquiries, project planning and personal support.</dd></div></dl></div><figure class="shoot-team-portrait">${img('shoot-team-portrait')}<figcaption>Bill and Roxana, Tint A Window.</figcaption></figure></section>`;
}

export function homeTeamNote({img}){
 return `<section class="section home-people-717" aria-labelledby="home-people-title"><div class="home-people-copy"><p class="eyebrow">A family business, since 1987</p><h2 id="home-people-title">Good advice starts<br>with a conversation.</h2><p>Unsure which film you need? Tell Bill and Roxana what you would like to change. We will help you compare suitable options for your glass, explain the finish and plan the next step.</p><p>With 39+ years of industry experience, we make the choices easier to understand, from a single window to a whole home or workplace.</p><div class="story-actions"><a class="button" href="/about">Meet Bill and Roxana</a><a class="button secondary" href="/contact-for-window-tinting">Get a Quote</a></div></div><figure>${img('shoot-team-conversation')}<figcaption>Personal advice from the people behind Tint A Window.</figcaption></figure></section>`;
}
