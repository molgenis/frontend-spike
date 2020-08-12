<component>
    <field-messages
        :name="fieldId" :state="fieldState"
        class="form-control-feedback"
        show="$touched || $submitted || $dirty"
    >
        <div key="required" slot="required" class="invalid-feedback">
            {{ requiredFieldMsg }}
        </div>
        <div key="email" slot="email" class="invalid-feedback">
            {{ notAValidEmailMsg }}
        </div>
        <div key="url" slot="url" class="invalid-feedback">
            {{ notAValidUrlMsg }}
        </div>
        <div key="integer" slot="integer" class="invalid-feedback">
            {{ notAValidIntegerMsg }}
        </div>
        <div key="long" slot="long" class="invalid-feedback">
            {{ notAValidLongMsg }}
        </div>
        <div key="number" slot="number" class="invalid-feedback">
            {{ notAValidNumberMsg }}
        </div>
        <div key="unique" slot="unique" class="invalid-feedback">
            {{ notUniqueMsg}}
        </div>
        <div key="validate" slot="validate" class="invalid-feedback">
            {{ validationFailedMsg }}
        </div>
        <div key="min" slot="min" class="invalid-feedback">
            {{ minMessage }}
        </div>
        <div key="max" slot="max" class="invalid-feedback">
            {{ maxMessage }}
        </div>
        <div key="maxlength" slot="maxlength" class="invalid-feedback">
            {{ maxlengthMsg }} {{ maxlength }}
        </div>
    </field-messages>
</component>
