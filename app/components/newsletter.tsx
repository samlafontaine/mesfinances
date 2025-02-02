export function Newsletter() {
  return (
    <div className="my-12 py-20 bg-gray-100 rounded-md px-4">
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-lg font-medium">Abonne-toi à l'infolettre</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
          Reçois mes nouveaux outils et articles directement dans tes courriels.
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: `
          <style>@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');</style>
          <div class="newsletter-form-container">
            <form class="newsletter-form" action="https://app.loops.so/api/newsletter-form/cm6my2mby00h8xs71fqbzooe5" method="POST" style="display: flex; flex-direction: row; align-items: center; justify-content: center; width: 100%;">
              <input class="newsletter-form-input" name="newsletter-form-input" type="email" placeholder="toi@exemple.com" required style="font-family: Inter, sans-serif; color: rgb(0, 0, 0); font-size: 14px; margin: 0px 10px 0px 0px; width: 100%; max-width: 300px; min-width: 100px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 213, 219); box-sizing: border-box; box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px; border-radius: 6px; padding: 8px 12px;">
              <button type="submit" class="newsletter-form-button" style="background: rgb(0, 0, 0); font-size: 14px; color: rgb(255, 255, 255); font-family: Inter, sans-serif; display: flex; width: min-content; max-width: 300px; white-space: nowrap; height: 38px; align-items: center; justify-content: center; flex-direction: row; padding: 9px 17px; box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px; border-radius: 6px; text-align: center; font-style: normal; font-weight: 500; line-height: 20px; border: none; cursor: pointer;">Je m'abonne</button>
              <button type="button" class="newsletter-loading-button" style="background: rgb(0, 0, 0); font-size: 14px; color: rgb(255, 255, 255); font-family: Inter, sans-serif; display: none; width: min-content; max-width: 300px; white-space: nowrap; height: 38px; align-items: center; justify-content: center; flex-direction: row; padding: 9px 17px; box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px; border-radius: 6px; text-align: center; font-style: normal; font-weight: 500; line-height: 20px; border: none; cursor: pointer;">Please wait...</button>
            </form>
            <div class="newsletter-success" style="display: none; align-items: center; justify-content: center; width: 100%;">
              <p class="newsletter-success-message" style="font-family: Inter, sans-serif; color: rgb(0, 0, 0); font-size: 14px;">Merci :)</p>
            </div>
            <div class="newsletter-error" style="display: none; align-items: center; justify-content: center; width: 100%;">
              <p class="newsletter-error-message" style="font-family: Inter, sans-serif; color: rgb(185, 28, 28); font-size: 14px;">Oops! Something went wrong, please try again</p>
            </div>
            <button class="newsletter-back-button" type="button" style="color:#6b7280;font: 14px, Inter, sans-serif;margin:10px auto;text-align:center;display:none;background:transparent;border:none;cursor:pointer" onmouseout="this.style.textDecoration='none'" onmouseover="this.style.textDecoration='underline'">&larr; Back</button>
          </div>
          `,
          }}
        />

        {/* Loops Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function submitHandler(event) {
              event.preventDefault();
              var container = event.target.parentNode;
              var form = container.querySelector(".newsletter-form");
              var formInput = container.querySelector(".newsletter-form-input");
              var success = container.querySelector(".newsletter-success");
              var errorContainer = container.querySelector(".newsletter-error");
              var errorMessage = container.querySelector(".newsletter-error-message");
              var backButton = container.querySelector(".newsletter-back-button");
              var submitButton = container.querySelector(".newsletter-form-button");
              var loadingButton = container.querySelector(".newsletter-loading-button");

              const rateLimit = () => {
                errorContainer.style.display = "flex";
                errorMessage.innerText = "Too many signups, please try again in a little while";
                submitButton.style.display = "none";
                formInput.style.display = "none";
                backButton.style.display = "block";
              }

              var time = new Date();
              var timestamp = time.valueOf();
              var previousTimestamp = localStorage.getItem("loops-form-timestamp");

              if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
                rateLimit();
                return;
              }
              localStorage.setItem("loops-form-timestamp", timestamp);

              submitButton.style.display = "none";
              loadingButton.style.display = "flex";

              var formBody = "userGroup=&mailingLists=&email=" + encodeURIComponent(formInput.value);

              fetch(event.target.action, {
                method: "POST",
                body: formBody,
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              })
                .then((res) => [res.ok, res.json(), res])
                .then(([ok, dataPromise, res]) => {
                  if (ok) {
                    success.style.display = "flex";
                    form.reset();
                  } else {
                    dataPromise.then(data => {
                      errorContainer.style.display = "flex";
                      errorMessage.innerText = data.message ? data.message : res.statusText;
                    });
                  }
                })
                .catch(error => {
                  if (error.message === "Failed to fetch") {
                    rateLimit();
                    return;
                  }
                  errorContainer.style.display = "flex";
                  if (error.message) errorMessage.innerText = error.message;
                  localStorage.setItem("loops-form-timestamp", '');
                })
                .finally(() => {
                  formInput.style.display = "none";
                  loadingButton.style.display = "none";
                  backButton.style.display = "block";
                });
            }

            function resetFormHandler(event) {
              var container = event.target.parentNode;
              var formInput = container.querySelector(".newsletter-form-input");
              var success = container.querySelector(".newsletter-success");
              var errorContainer = container.querySelector(".newsletter-error");
              var errorMessage = container.querySelector(".newsletter-error-message");
              var backButton = container.querySelector(".newsletter-back-button");
              var submitButton = container.querySelector(".newsletter-form-button");

              success.style.display = "none";
              errorContainer.style.display = "none";
              errorMessage.innerText = "Oops! Something went wrong, please try again";
              backButton.style.display = "none";
              formInput.style.display = "flex";
              submitButton.style.display = "flex";
            }

            var formContainers = document.getElementsByClassName("newsletter-form-container");

            for (var i = 0; i < formContainers.length; i++) {
              var formContainer = formContainers[i]
              var handlersAdded = formContainer.classList.contains('newsletter-handlers-added')
              if (handlersAdded) continue;
              formContainer
                .querySelector(".newsletter-form")
                .addEventListener("submit", submitHandler);
              formContainer
                .querySelector(".newsletter-back-button")
                .addEventListener("click", resetFormHandler);
              formContainer.classList.add("newsletter-handlers-added");
            }
          `,
          }}
        />
      </div>
    </div>
  );
}
